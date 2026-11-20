<script setup lang="ts">
// An array of Ball objects in a StdDraw-style canvas (0 to 1 on both axes,
// y pointing up). Each step every ball runs update(): move by its velocity,
// then flip vx or vy if its edge has passed a wall. Click a ball to see its
// members. Starts paused; only the window where Play was pressed runs the
// timer.
import { onSlideLeave } from '@slidev/client'
import { computed, watch } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const SIZE = 300
const COLORS: [string, string][] = [
  ['RED', '#dc2626'],
  ['BLUE', '#2563eb'],
  ['GREEN', '#16a34a'],
  ['ORANGE', '#ea580c'],
  ['MAGENTA', '#c026d3'],
  ['CYAN', '#0891b2'],
]

interface Ball { color: number, x: number, y: number, r: number, vx: number, vy: number }

function rnd(min: number, max: number) {
  return min + Math.random() * (max - min)
}
function round(v: number) {
  return Math.round(v * 1000) / 1000
}
function makeBall(i: number): Ball {
  const r = round(rnd(0.04, 0.07))
  const sign = () => (Math.random() < 0.5 ? -1 : 1)
  return {
    color: i % COLORS.length,
    x: round(rnd(r, 1 - r)),
    y: round(rnd(r, 1 - r)),
    r,
    vx: round(sign() * rnd(0.005, 0.015)),
    vy: round(sign() * rnd(0.005, 0.015)),
  }
}
function fresh() {
  return {
    balls: Array.from({ length: 4 }, (_, i) => makeBall(i)),
    sel: 0,
    steps: 0,
    running: false,
  }
}

const s = useSyncedState('bouncing-balls', fresh(), { shareInitial: true })
let timer: ReturnType<typeof setInterval> | undefined

const selected = computed(() => s.balls[s.sel])

// The same update method as on the slide.
function update(b: Ball) {
  b.x = round(b.x + b.vx)
  b.y = round(b.y + b.vy)
  if (b.x - b.r < 0 || b.x + b.r > 1)
    b.vx = -b.vx
  if (b.y - b.r < 0 || b.y + b.r > 1)
    b.vy = -b.vy
}
function step() {
  const next = s.balls.map(b => ({ ...b }))
  next.forEach(update)
  s.balls = next
  s.steps++
}

function stopTimer() {
  if (timer)
    clearInterval(timer)
  timer = undefined
}
function pause() {
  s.running = false
  stopTimer()
}
function play() {
  s.running = true
  stopTimer()
  timer = setInterval(step, 40)
}
function addBall() {
  if (s.balls.length < 12)
    s.balls = [...s.balls, makeBall(s.balls.length)]
}
function reset() {
  pause()
  Object.assign(s, fresh())
}

watch(() => s.running, (isRunning) => {
  if (!isRunning)
    stopTimer()
})

try {
  onSlideLeave(pause)
}
catch {}

const px = (v: number) => v * SIZE
const fmt = (v: number) => v.toFixed(3)
</script>

<template>
  <div class="bb" @keydown.stop>
    <div class="bb-left">
      <div class="bb-bar">
        <button type="button" class="primary" @click="s.running ? pause() : play()">
          {{ s.running ? 'Pause' : 'Play' }}
        </button>
        <button type="button" :disabled="s.running" @click="step">
          Step
        </button>
        <button type="button" :disabled="s.balls.length >= 12" @click="addBall">
          Add ball
        </button>
        <button type="button" @click="reset">
          Reset
        </button>
      </div>
      <svg
        :viewBox="`0 0 ${SIZE} ${SIZE}`"
        class="bb-canvas"
        role="group"
        :aria-label="`Canvas from 0 to 1 on both axes with ${s.balls.length} balls. Click a ball to see its members.`"
      >
        <rect x="1" y="1" :width="SIZE - 2" :height="SIZE - 2" class="bb-box" />
        <g
          v-for="(b, i) in s.balls"
          :key="i"
          class="bb-ball"
          role="button"
          tabindex="0"
          :aria-label="`Ball ${i}, ${COLORS[b.color][0]}`"
          @click="s.sel = i"
          @keydown.enter="s.sel = i"
        >
          <circle :cx="px(b.x)" :cy="SIZE - px(b.y)" :r="px(b.r)" :fill="COLORS[b.color][1]" :class="{ sel: s.sel === i }" />
          <text :x="px(b.x)" :y="SIZE - px(b.y) + 6" class="bb-num">{{ i }}</text>
        </g>
      </svg>
    </div>

    <div class="bb-right" aria-live="polite">
      <div class="bb-title">
        balls[{{ s.sel }}]: its members
      </div>
      <table v-if="selected" class="bb-table">
        <tbody>
          <tr><td>color</td><td>Color.{{ COLORS[selected.color][0] }}</td></tr>
          <tr><td>x</td><td>{{ fmt(selected.x) }}</td></tr>
          <tr><td>y</td><td>{{ fmt(selected.y) }}</td></tr>
          <tr><td>radius</td><td>{{ fmt(selected.r) }}</td></tr>
          <tr :class="{ neg: selected.vx < 0 }">
            <td>vx</td><td>{{ fmt(selected.vx) }} {{ selected.vx < 0 ? '← moving left' : '→ moving right' }}</td>
          </tr>
          <tr :class="{ neg: selected.vy < 0 }">
            <td>vy</td><td>{{ fmt(selected.vy) }} {{ selected.vy < 0 ? '↓ moving down' : '↑ moving up' }}</td>
          </tr>
        </tbody>
      </table>
      <div class="bb-status">
        Step {{ s.steps }} · {{ s.balls.length }} Ball objects in the array. Click a ball to inspect it.
      </div>
    </div>
  </div>
</template>

<style scoped>
.bb {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 28px;
  align-items: start;
}
.bb-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bb-bar {
  display: flex;
  gap: 6px;
}
.bb-bar button {
  font: inherit;
  font-size: 18px;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.bb-bar button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  min-width: 80px;
}
.bb-bar button:disabled {
  opacity: 0.45;
  cursor: default;
}
.bb-canvas {
  width: 320px;
  height: 320px;
}
.bb-box {
  fill: #ffffff;
  stroke: var(--c-ink, #0f172a);
  stroke-width: 2;
}
.bb-ball {
  cursor: pointer;
}
.bb-ball circle {
  stroke: #0f172a;
  stroke-width: 2;
}
.bb-ball circle.sel {
  stroke-width: 5;
}
.bb-num {
  text-anchor: middle;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  fill: #ffffff;
  pointer-events: none;
}
.bb-right {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 42px;
}
.bb-title {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 21px;
  font-weight: 700;
}
.bb-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px !important;
}
.bb-table td {
  padding: 3px 10px 3px 0 !important;
  font-family: var(--slidev-font-mono, monospace);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.bb-table td:first-child {
  font-weight: 700;
  width: 90px;
}
.bb-table tr.neg td:last-child {
  color: var(--c-accent-2, #c2410c);
}
.bb-status {
  font-size: 18px;
  color: var(--c-muted, #475569);
}
</style>
