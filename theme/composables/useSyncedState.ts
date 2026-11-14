// Keeps a demo's state identical in every open window of the deck (for
// example the projector window and the presenter window), so a click in one
// shows up in the other. Uses BroadcastChannel, so it works between windows
// of the same browser on the same computer.
//
// Demos always start clean:
// - every time their slide is entered, the demo goes back to its starting
//   state (in each window, so the windows stay in step);
// - a window that has just been opened never copies clicks made earlier in
//   another window. It only copies the starting state of demos that begin
//   with random values, so both windows show the same puzzle.
import { onSlideEnter, useSlideContext } from '@slidev/client'
import { onScopeDispose, reactive, watch } from 'vue'

type Message = { type: 'state', json: string } | { type: 'baseline', json: string } | { type: 'hello' }

interface Options {
  // The demo starts in a random state, so a newly opened window copies the
  // starting state of the window that was already open.
  shareInitial?: boolean
  // Keep the state when the slide is left and entered again, and hand the
  // current state to newly opened windows (used by the work timer).
  persist?: boolean
}

export function useSyncedState<T extends object>(
  name: string,
  initial: T,
  options: Options = {},
): T {
  const state = reactive(initial) as T

  // One channel per demo per slide, so two quizzes on different slides
  // do not overwrite each other.
  let page: number | string = 'x'
  try {
    page = useSlideContext().$page.value
  }
  catch {}

  // The starting state this demo returns to.
  let baselineJson = JSON.stringify(state)
  let lastJson = baselineJson
  // True while we copy in a state that must not be broadcast back.
  let applying = false

  function apply(json: string) {
    lastJson = json
    applying = true
    try {
      Object.assign(state, JSON.parse(json))
    }
    finally {
      applying = false
    }
  }

  if (!options.persist) {
    try {
      // Each window resets its own copy; nothing is broadcast.
      onSlideEnter(() => {
        if (lastJson !== baselineJson)
          apply(baselineJson)
      })
    }
    catch {}
  }

  if (typeof BroadcastChannel === 'undefined')
    return state

  const channel = new BroadcastChannel(`comp1600-demo:${name}:${page}`)

  channel.onmessage = (event: MessageEvent<Message>) => {
    const msg = event.data
    if (msg.type === 'hello') {
      // A window just opened.
      if (options.persist)
        channel.postMessage({ type: 'state', json: lastJson })
      else if (options.shareInitial)
        channel.postMessage({ type: 'baseline', json: baselineJson })
      return
    }
    if (msg.type === 'baseline') {
      // Adopt the other window's starting state, unless we have already
      // been used.
      if (msg.json !== baselineJson) {
        const untouched = lastJson === baselineJson
        baselineJson = msg.json
        if (untouched)
          apply(msg.json)
      }
      return
    }
    if (msg.json !== lastJson)
      apply(msg.json)
  }

  watch(state, () => {
    if (applying)
      return
    const json = JSON.stringify(state)
    if (json === lastJson)
      return
    lastJson = json
    channel.postMessage({ type: 'state', json })
  }, { deep: true, flush: 'sync' })

  channel.postMessage({ type: 'hello' })
  onScopeDispose(() => channel.close())

  return state
}
