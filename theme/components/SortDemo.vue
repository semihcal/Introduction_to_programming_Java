<script setup lang="ts">
// Step through bubble sort or selection sort one comparison at a time.
import { onSlideLeave } from '@slidev/client'
import { computed, watch } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{
  mode?: 'bubble' | 'selection'
  values?: number[]
}>(), { mode: 'bubble', values: () => [7, 45, 0, 54, 37, 108, 51] })

interface Frame {
  arr: number[]
  pair: number[] // the two positions being compared or swapped
  min: number // selection sort: index of the smallest so far
  settled: number[] // positions already in their final place
  msg: string
  pass: number
  comps: number
  swaps: number
}

// Work out every step in advance; the demo then just moves through them.
function build(): Frame[] {
  const a = [...props.values]
  const n = a.length
  const frames: Frame[] = []
  let comps = 0
  let swaps = 0
  const settled: number[] = []
  const push = (pair: number[], min: number, msg: string, pass: number) =>
    frames.push({ arr: [...a], pair, min, settled: [...settled], msg, pass, comps, swaps })

  push([], -1, 'Press Step to make the first comparison.', 1)

  if (props.mode === 'bubble') {
    for (let pass = 1; pass <= n - 1; pass++) {
      let swapped = false
      for (let j = 0; j < n - 1; j++) {
        comps++
        if (a[j] > a[j + 1]) {
          // Two steps, so the picture always matches the sentence: first
          // show the pair as it is, then show it after the swap.
          push([j, j + 1], -1, `${a[j]} > ${a[j + 1]}: out of order, so swap them.`, pass)
          ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
          swaps++
          swapped = true
          push([j, j + 1], -1, `Swapped: ${a[j]} is now before ${a[j + 1]}.`, pass)
        }
        else {
          push([j, j + 1], -1, `${a[j]} and ${a[j + 1]} are in order: no swap.`, pass)
        }
      }
      settled.push(n - pass)
      if (!swapped) {
        for (let k = 0; k < n; k++) {
          if (!settled.includes(k))
            settled.push(k)
        }
        push([], -1, `Pass ${pass} made no swaps, so the array is sorted.`, pass)
        return frames
      }
      push([], -1, `End of pass ${pass}: ${a[n - pass]} has reached its place.`, pass)
    }
    for (let k = 0; k < n; k++) {
      if (!settled.includes(k))
        settled.push(k)
    }
    push([], -1, `Sorted after ${n - 1} passes.`, n - 1)
    return frames
  }

  for (let i = 0; i < n - 1; i++) {
    let min = i
    push([i], min, `Pass ${i + 1}: start with ${a[i]} at index ${i} as the smallest so far.`, i + 1)
    for (let j = i + 1; j < n; j++) {
      comps++
      if (a[j] < a[min]) {
        min = j
        push([j], min, `${a[j]} is smaller: minIndex becomes ${j}.`, i + 1)
      }
      else {
        push([j], min, `${a[j]} is not smaller than ${a[min]}: keep minIndex ${min}.`, i + 1)
      }
    }
    if (min !== i) {
      // Two steps here as well: show the pair before and after the swap.
      push([i, min], min, `End of pass: the smallest is ${a[min]}. Swap it with ${a[i]} at index ${i}.`, i + 1)
      ;[a[i], a[min]] = [a[min], a[i]]
      swaps++
      settled.push(i)
      push([i, min], -1, `Swapped: ${a[i]} is now at index ${i}.`, i + 1)
    }
    else {
      settled.push(i)
      push([i], -1, `${a[i]} is already in place: no swap needed.`, i + 1)
    }
  }
  settled.push(n - 1)
  push([], -1, 'Sorted: only the largest value was left.', n - 1)
  return frames
}

const frames = build()
const s = useSyncedState(`sort-${props.mode}-${props.values.join('-')}`, { k: 0, running: false })
let timer: ReturnType<typeof setInterval> | undefined

const frame = computed(() => frames[Math.min(s.k, frames.length - 1)])
const finished = computed(() => s.k >= frames.length - 1)

function stopTimer() {
  if (timer)
    clearInterval(timer)
  timer = undefined
}
function pause() {
  s.running = false
  stopTimer()
}
function step() {
  if (!finished.value)
    s.k++
  if (finished.value)
    pause()
}
function play() {
  if (finished.value)
    s.k = 0
  s.running = true
  stopTimer()
  timer = setInterval(step, 650)
}
function reset() {
  pause()
  s.k = 0
}

watch(() => s.running, (isRunning) => {
  if (!isRunning)
    stopTimer()
})

try {
  onSlideLeave(pause)
}
catch {}
</script>

<template>
  <div class="so" @keydown.stop>
    <div class="so-bar">
      <button type="button" class="primary" @click="s.running ? pause() : play()">
        {{ s.running ? 'Pause' : 'Play' }}
      </button>
      <button type="button" :disabled="s.running || finished" @click="step">
        Step
      </button>
      <button type="button" @click="reset">
        Reset
      </button>
      <span class="so-stats">
        Pass <b>{{ frame.pass }}</b> · comparisons <b>{{ frame.comps }}</b> · swaps <b>{{ frame.swaps }}</b>
      </span>
    </div>

    <div class="so-row" role="img" :aria-label="`Array: ${frame.arr.join(', ')}. ${frame.msg}`">
      <div
        v-for="(v, i) in frame.arr"
        :key="i"
        class="so-cell"
        :class="{ pair: frame.pair.includes(i), settled: frame.settled.includes(i), min: frame.min === i }"
      >
        <div class="so-val">
          {{ v }}
        </div>
        <div class="so-idx">
          {{ i }}
        </div>
        <div class="so-tag">
          {{ frame.min === i ? 'min' : frame.settled.includes(i) ? 'done' : '' }}
        </div>
      </div>
    </div>

    <div class="so-msg" aria-live="polite">
      {{ frame.msg }}
    </div>
  </div>
</template>

<style scoped>
.so {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.so-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}
.so-bar button {
  font: inherit;
  font-size: 19px;
  font-weight: 600;
  padding: 4px 16px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.so-bar button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  min-width: 88px;
}
.so-bar button:disabled {
  opacity: 0.45;
  cursor: default;
}
.so-stats {
  margin-left: 14px;
  font-size: 20px;
  font-variant-numeric: tabular-nums;
}
.so-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.so-cell {
  width: 96px;
  text-align: center;
}
.so-val {
  height: 70px;
  display: grid;
  place-items: center;
  border: 3px solid var(--c-ink, #0f172a);
  border-radius: 10px;
  background: var(--c-paper, #fff);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 30px;
  font-weight: 700;
}
.so-idx {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.so-tag {
  height: 24px;
  font-size: 18px;
  font-weight: 700;
  color: var(--c-accent, #3730a3);
}
.so-cell.settled .so-val {
  background: var(--c-accent-soft, #eef2ff);
  border-color: var(--c-accent, #3730a3);
}
.so-cell.min .so-val {
  border-style: dashed;
  border-color: var(--c-accent, #3730a3);
}
.so-cell.pair .so-val {
  border: 6px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.so-msg {
  font-size: 22px;
  min-height: 62px;
  padding: 12px 18px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
</style>
