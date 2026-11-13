<script setup lang="ts">
// A playable Conway's Game of Life. Starts paused; edges do not wrap,
// matching the bounds check taught in countLiveNeighbors.
import { onSlideLeave } from '@slidev/client'
import { computed, watch } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{
  rows?: number
  cols?: number
  prob?: number
  cell?: number
}>(), { rows: 11, cols: 30, prob: 0.3, cell: 24 })

function randomGrid(): boolean[][] {
  return Array.from({ length: props.rows }, () =>
    Array.from({ length: props.cols }, () => Math.random() < props.prob))
}

// grid, generation and running are shared with the other open windows.
// Only the window where Play was pressed runs the timer; the others just
// receive each new generation.
const life = useSyncedState('life', {
  grid: randomGrid(),
  generation: 0,
  running: false,
}, { shareInitial: true })
let timer: ReturnType<typeof setInterval> | undefined

const alive = computed(() =>
  life.grid.reduce((n, row) => n + row.filter(Boolean).length, 0))

function countLiveNeighbors(g: boolean[][], row: number, col: number) {
  let count = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0)
        continue
      const r = row + i
      const c = col + j
      if (r >= 0 && r < props.rows && c >= 0 && c < props.cols && g[r][c])
        count++
    }
  }
  return count
}

function step() {
  const old = life.grid
  life.grid = old.map((row, r) => row.map((isAlive, c) => {
    const n = countLiveNeighbors(old, r, c)
    return isAlive ? (n === 2 || n === 3) : n === 3
  }))
  life.generation++
  if (alive.value === 0)
    pause()
}

function stopTimer() {
  if (timer)
    clearInterval(timer)
  timer = undefined
}

function pause() {
  life.running = false
  stopTimer()
}

// Another window pressed Pause: stop our timer too.
watch(() => life.running, (isRunning) => {
  if (!isRunning)
    stopTimer()
})

function play() {
  if (alive.value === 0)
    return
  life.running = true
  stopTimer()
  timer = setInterval(step, 450)
}

function randomize() {
  pause()
  life.grid = randomGrid()
  life.generation = 0
}

function clear() {
  pause()
  life.grid = life.grid.map(row => row.map(() => false))
  life.generation = 0
}

function toggle(r: number, c: number) {
  life.grid[r][c] = !life.grid[r][c]
}

try {
  onSlideLeave(pause)
}
catch {}
</script>

<template>
  <div class="life" @keydown.stop>
    <div class="bar">
      <button type="button" class="primary" @click="life.running ? pause() : play()">
        {{ life.running ? 'Pause' : 'Play' }}
      </button>
      <button type="button" :disabled="life.running" @click="step">
        Step
      </button>
      <button type="button" @click="randomize">
        Random
      </button>
      <button type="button" @click="clear">
        Clear
      </button>
      <span class="stat" aria-live="polite">
        Generation <b>{{ life.generation }}</b> · Alive <b>{{ alive }}</b>
      </span>
    </div>
    <div
      class="grid"
      role="group"
      aria-label="Game of Life grid. Dark cells are alive, light cells are dead. Click a cell to toggle it."
      :style="{ gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gridAutoRows: `${cell}px` }"
    >
      <template v-for="(row, r) in life.grid" :key="r">
        <button
          v-for="(isAlive, c) in row"
          :key="`${r}-${c}`"
          type="button"
          class="cell"
          :class="{ on: isAlive }"
          :aria-pressed="isAlive"
          :aria-label="`Row ${r}, column ${c}: ${isAlive ? 'alive' : 'dead'}`"
          tabindex="-1"
          @click="toggle(r, c)"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.life {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.bar {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
}
.bar button {
  font: inherit;
  font-weight: 600;
  padding: 4px 16px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  color: var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  cursor: pointer;
}
.bar button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  min-width: 92px;
}
.bar button:disabled {
  opacity: 0.45;
  cursor: default;
}
.stat {
  margin-left: 12px;
  font-variant-numeric: tabular-nums;
}
.grid {
  display: grid;
  gap: 1px;
  padding: 1px;
  background: var(--c-line, #94a3b8);
  border-radius: 6px;
}
.cell {
  padding: 0;
  border: 0;
  background: var(--c-dead, #fff);
  cursor: pointer;
}
.cell.on {
  background: var(--c-alive, #0f172a);
}
</style>
