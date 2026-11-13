// Keeps a demo's state identical in every open window of the deck (for
// example the projector window and the presenter window), so a click in one
// shows up in the other. Uses BroadcastChannel, so it works between windows
// of the same browser on the same computer.
import { useSlideContext } from '@slidev/client'
import { onScopeDispose, reactive, watch } from 'vue'

type Message<T> = { type: 'state', json: string } | { type: 'hello' }

export function useSyncedState<T extends object>(
  name: string,
  initial: T,
  // Set for demos that start in a random state, so a newly opened window
  // copies the state of the window that was already open.
  options: { shareInitial?: boolean } = {},
): T {
  const state = reactive(initial) as T

  // One channel per demo per slide, so two quizzes on different slides
  // do not overwrite each other.
  let page: number | string = 'x'
  try {
    page = useSlideContext().$page.value
  }
  catch {}

  if (typeof BroadcastChannel === 'undefined')
    return state

  const channel = new BroadcastChannel(`comp1600-demo:${name}:${page}`)
  const initialJson = JSON.stringify(state)
  let lastJson = initialJson
  // True while we copy in another window's state, so that copy is not
  // broadcast back field by field.
  let applying = false

  channel.onmessage = (event: MessageEvent<Message<T>>) => {
    const msg = event.data
    if (msg.type === 'hello') {
      // A window just opened: send it our state if we have changed anything.
      if (options.shareInitial || lastJson !== initialJson)
        channel.postMessage({ type: 'state', json: lastJson })
      return
    }
    if (msg.json === lastJson)
      return
    lastJson = msg.json
    applying = true
    try {
      Object.assign(state, JSON.parse(msg.json))
    }
    finally {
      applying = false
    }
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
