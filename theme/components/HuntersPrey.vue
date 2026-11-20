<script setup lang="ts">
// Hunters and prey: each hunter heads for the nearest living prey and eats
// it on contact; each prey heads away from the nearest hunter. Starts
// paused. Only the window where Play was pressed runs the timer; other
// windows receive each new position.
import { onSlideLeave } from '@slidev/client'
import { computed, watch } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const W = 600
const H = 300
const HUNTER_SPEED = 4
const PREY_SPEED = 3
const HUNTER_R = 12
const PREY_R = 9

interface Ball { x: number, y: number }
interface Prey extends Ball { alive: boolean }

function rnd(min: number, max: number) {
  return min + Math.random() * (max - min)
}
function fresh() {
  return {
    hunters: Array.from({ length: 2 }, () => ({ x: rnd(40, W - 40), y: rnd(40, H - 40) })) as Ball[],
    prey: Array.from({ length: 8 }, () => ({ x: rnd(30, W - 30), y: rnd(30, H - 30), alive: true })) as Prey[],
    steps: 0,
    running: false,
  }
}

const s = useSyncedState('hunters-prey', fresh(), { shareInitial: true })
let timer: ReturnType<typeof setInterval> | undefined

const alive = computed(() => s.prey.filter(p => p.alive).length)
const status = computed(() => {
  if (alive.value === 0)
    return `All prey eaten after ${s.steps} steps.`
  return `Step ${s.steps}: ${alive.value} of ${s.prey.length} prey still alive, ${s.hunters.length} hunters.`
})

const dist = (a: Ball, b: Ball) => Math.hypot(a.x - b.x, a.y - b.y)
function nearest<T extends Ball>(from: Ball, list: T[]): T | undefined {
  let best: T | undefined
  for (const o of list) {
    if (!best || dist(from, o) < dist(from, best))
      best = o
  }
  return best
}
// Move `ball` one step of length `speed` toward (sign 1) or away from (sign -1) `target`.
function stepTowards(ball: Ball, target: Ball, speed: number, sign: number, r: number) {
  const d = dist(ball, target) || 1
  ball.x = Math.min(W - r, Math.max(r, ball.x + sign * speed * (target.x - ball.x) / d))
  ball.y = Math.min(H - r, Math.max(r, ball.y + sign * speed * (target.y - ball.y) / d))
}

function step() {
  const hunters = s.hunters.map(h => ({ ...h }))
  const prey = s.prey.map(p => ({ ...p }))
  const living = prey.filter(p => p.alive)
  for (const p of living) {
    const h = nearest(p, hunters)
    if (h)
      stepTowards(p, h, PREY_SPEED, -1, PREY_R)
  }
  for (const h of hunters) {
    const target = nearest(h, prey.filter(p => p.alive))
    if (!target)
      continue
    stepTowards(h, target, HUNTER_SPEED, 1, HUNTER_R)
    if (dist(h, target) <= HUNTER_R + PREY_R)
      target.alive = false
  }
  s.hunters = hunters
  s.prey = prey
  s.steps++
  if (prey.every(p => !p.alive))
    pause()
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
  if (alive.value === 0)
    return
  s.running = true
  stopTimer()
  timer = setInterval(step, 90)
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
</script>

<template>
  <div class="hp" @keydown.stop>
    <div class="hp-bar">
      <button type="button" class="primary" :disabled="alive === 0" @click="s.running ? pause() : play()">
        {{ s.running ? 'Pause' : 'Play' }}
      </button>
      <button type="button" :disabled="s.running || alive === 0" @click="step">
        Step
      </button>
      <button type="button" @click="reset">
        New start
      </button>
      <span class="hp-key">
        <svg width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="9" class="h" /></svg> hunter
        <svg width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="7" class="p" /></svg> prey
        <svg width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="7" class="d" /></svg> eaten
      </span>
    </div>
    <svg :viewBox="`0 0 ${W} ${H}`" class="hp-field" role="img" :aria-label="status">
      <rect x="1" y="1" :width="W - 2" :height="H - 2" rx="10" class="hp-box" />
      <circle v-for="(p, i) in s.prey" :key="`p${i}`" :cx="p.x" :cy="p.y" :r="PREY_R" :class="p.alive ? 'p' : 'd'" />
      <circle v-for="(h, i) in s.hunters" :key="`h${i}`" :cx="h.x" :cy="h.y" :r="HUNTER_R" class="h" />
    </svg>
    <div class="hp-status" aria-live="polite">
      {{ status }}
    </div>
  </div>
</template>

<style scoped>
.hp {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hp-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}
.hp-bar button {
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
.hp-bar button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  min-width: 88px;
}
.hp-bar button:disabled {
  opacity: 0.45;
  cursor: default;
}
.hp-key {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 18px;
}
.hp-key svg {
  margin-left: 8px;
}
.hp-field {
  width: 100%;
  max-height: 300px;
}
.hp-box {
  fill: var(--c-paper, #fff);
  stroke: var(--c-line, #94a3b8);
  stroke-width: 2;
}
.h {
  fill: var(--c-accent-2, #c2410c);
  stroke: #7c2d12;
  stroke-width: 3;
}
.p {
  fill: var(--c-accent, #3730a3);
  stroke: #1e1b4b;
  stroke-width: 2;
}
.d {
  fill: none;
  stroke: var(--c-line, #94a3b8);
  stroke-width: 2;
  stroke-dasharray: 3 3;
}
.hp-status {
  font-size: 19px;
}
</style>
