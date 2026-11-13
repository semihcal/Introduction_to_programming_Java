<script setup lang="ts">
// Traces two nested loops over a small picture, one pixel per step, so
// students can see the order in which (x, y) pairs are visited.
import { onSlideLeave } from '@slidev/client'
import { computed, watch } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const W = 8
const H = 5
const TOTAL = W * H

// `done` counts the pixels already set. `xOuter` chooses which loop is outside.
const loop = useSyncedState('loopfill', { done: 0, xOuter: true, running: false })
let timer: ReturnType<typeof setInterval> | undefined

// Position of the k-th pixel visited, for the chosen loop order.
function position(k: number) {
  return loop.xOuter
    ? { x: Math.floor(k / H), y: k % H }
    : { x: k % W, y: Math.floor(k / W) }
}

function orderOf(x: number, y: number) {
  return loop.xOuter ? x * H + y : y * W + x
}

const finished = computed(() => loop.done >= TOTAL)
const current = computed(() => position(Math.min(loop.done, TOTAL - 1)))
const status = computed(() => {
  if (loop.done === 0)
    return 'No pixels set yet.'
  if (finished.value)
    return `Done: set ran ${TOTAL} times (${W} × ${H}).`
  const last = position(loop.done - 1)
  return `set ran ${loop.done} of ${TOTAL} times. Last pixel: x = ${last.x}, y = ${last.y}.`
})

function stopTimer() {
  if (timer)
    clearInterval(timer)
  timer = undefined
}
function pause() {
  loop.running = false
  stopTimer()
}
function step() {
  if (!finished.value)
    loop.done++
  if (finished.value)
    pause()
}
function play() {
  if (finished.value)
    loop.done = 0
  loop.running = true
  stopTimer()
  timer = setInterval(step, 420)
}
function reset() {
  pause()
  loop.done = 0
}
function swap() {
  pause()
  loop.done = 0
  loop.xOuter = !loop.xOuter
}

// Another window pressed Pause: stop our timer too.
watch(() => loop.running, (isRunning) => {
  if (!isRunning)
    stopTimer()
})

try {
  onSlideLeave(pause)
}
catch {}
</script>

<template>
  <div class="loopfill" @keydown.stop>
    <div class="left">
      <div class="xs" aria-hidden="true">
        <span v-for="x in W" :key="x">{{ x - 1 }}</span>
      </div>
      <div class="body">
        <div class="ys" aria-hidden="true">
          <span v-for="y in H" :key="y">{{ y - 1 }}</span>
        </div>
        <div
          class="grid"
          role="img"
          :aria-label="`A picture ${W} pixels wide and ${H} pixels high. ${status}`"
          :style="{ gridTemplateColumns: `repeat(${W}, 44px)` }"
        >
          <template v-for="y in H" :key="y">
            <div
              v-for="x in W"
              :key="`${x}-${y}`"
              class="px"
              :class="{
                set: orderOf(x - 1, y - 1) < loop.done,
                now: !finished && current.x === x - 1 && current.y === y - 1,
              }"
            >
              <template v-if="orderOf(x - 1, y - 1) < loop.done">
                {{ orderOf(x - 1, y - 1) + 1 }}
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="buttons">
        <button type="button" class="primary" @click="loop.running ? pause() : play()">
          {{ loop.running ? 'Pause' : 'Play' }}
        </button>
        <button type="button" :disabled="loop.running || finished" @click="step">
          Step
        </button>
        <button type="button" @click="reset">
          Reset
        </button>
        <button type="button" @click="swap">
          Swap loops
        </button>
      </div>
      <pre class="code"><span :class="{ outer: true }">for {{ loop.xOuter ? 'x' : 'y' }} = 0 … {{ (loop.xOuter ? W : H) - 1 }}</span>
  for {{ loop.xOuter ? 'y' : 'x' }} = 0 … {{ (loop.xOuter ? H : W) - 1 }}
    picture.set(<b>{{ finished ? '–' : current.x }}</b>, <b>{{ finished ? '–' : current.y }}</b>, blue)</pre>
      <div class="status" aria-live="polite">
        {{ status }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.loopfill {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 28px;
  align-items: center;
}
.xs {
  display: grid;
  grid-template-columns: repeat(8, 44px);
  gap: 2px;
  margin-left: 30px;
  padding-left: 2px;
}
.xs span,
.ys span {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  color: var(--c-muted, #475569);
  text-align: center;
}
.body {
  display: flex;
  align-items: stretch;
}
.ys {
  display: grid;
  grid-auto-rows: 44px;
  gap: 2px;
  width: 30px;
  padding-top: 2px;
  align-items: center;
}
.grid {
  display: grid;
  grid-auto-rows: 44px;
  gap: 2px;
  padding: 2px;
  background: var(--c-ink, #0f172a);
  border-radius: 6px;
}
.px {
  display: grid;
  place-items: center;
  background: #ffffff;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}
.px.set {
  background: #1d4ed8;
}
.px.now {
  outline: 4px solid var(--c-accent-2, #c2410c);
  outline-offset: -4px;
}
.panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.buttons button {
  font: inherit;
  font-size: 19px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.buttons button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  min-width: 88px;
}
.buttons button:disabled {
  opacity: 0.45;
  cursor: default;
}
.code {
  margin: 0;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  line-height: 1.45;
  white-space: pre;
  font-variant-numeric: tabular-nums;
}
.code b {
  color: var(--c-accent-2, #c2410c);
}
.status {
  font-size: 19px;
  line-height: 1.35;
  min-height: 52px;
}
</style>
