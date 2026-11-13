<script setup lang="ts">
// Shows the 8 (i, j) offsets around a chosen cell and which ones fall
// outside the grid, to motivate the bounds check in countLiveNeighbors.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const ROWS = 4
const COLS = 5
const grid = [
  [true, false, false, true, false],
  [true, true, false, false, false],
  [false, false, true, false, true],
  [false, true, false, false, true],
]

const current = useSyncedState('offsets', { r: 0, c: 0 })

interface Slot { r: number, c: number, inside: boolean, alive: boolean, offset: string | null, self: boolean }

// Draw one ring of "outside" cells around the real grid.
const slots = computed<Slot[]>(() => {
  const out: Slot[] = []
  for (let r = -1; r <= ROWS; r++) {
    for (let c = -1; c <= COLS; c++) {
      const inside = r >= 0 && r < ROWS && c >= 0 && c < COLS
      const i = r - current.r
      const j = c - current.c
      const near = Math.abs(i) <= 1 && Math.abs(j) <= 1
      const self = i === 0 && j === 0
      out.push({
        r,
        c,
        inside,
        alive: inside && grid[r][c],
        offset: near && !self ? `${i},${j}` : null,
        self,
      })
    }
  }
  return out
})

const counted = computed(() => slots.value.filter(s => s.offset && s.inside && s.alive).length)
const skipped = computed(() => slots.value.filter(s => s.offset && !s.inside).length)

function pick(s: Slot) {
  if (s.inside)
    Object.assign(current, { r: s.r, c: s.c })
}
</script>

<template>
  <div class="wrap" @keydown.stop>
    <div
      class="grid"
      role="group"
      aria-label="A 4 by 5 grid with a ring of outside positions. Click a cell to choose the current cell."
      :style="{ gridTemplateColumns: `repeat(${COLS + 2}, 48px)` }"
    >
      <button
        v-for="s in slots"
        :key="`${s.r}:${s.c}`"
        type="button"
        class="slot"
        :class="{ outside: !s.inside, alive: s.alive, self: s.self, near: !!s.offset }"
        :disabled="!s.inside"
        :aria-label="s.inside ? `Row ${s.r}, column ${s.c}: ${s.alive ? 'alive' : 'dead'}` : 'Outside the grid'"
        @click="pick(s)"
      >
        <template v-if="s.self">
          me
        </template>
        <template v-else-if="s.offset">
          {{ s.offset }}
        </template>
      </button>
    </div>
    <div class="readout" aria-live="polite">
      <div>Row <b>{{ current.r }}</b>, column <b>{{ current.c }}</b> · live neighbors: <b>{{ counted }}</b></div>
      <div>Outside the grid, skipped: <b>{{ skipped }}</b></div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.grid {
  display: grid;
  grid-auto-rows: 46px;
  gap: 3px;
}
.slot {
  padding: 0;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 6px;
  background: var(--c-dead, #fff);
  color: var(--c-ink, #0f172a);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.08em;
  white-space: nowrap;
  cursor: pointer;
}
.slot.alive {
  background: var(--c-alive, #0f172a);
  color: #fff;
}
.slot.outside {
  border-style: dashed;
  background: transparent;
  cursor: default;
  opacity: 0.35;
}
.slot.outside.near {
  opacity: 1;
  color: var(--c-accent-2, #c2410c);
  border-color: var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.slot.near:not(.outside) {
  border: 3px solid var(--c-accent, #3730a3);
}
.slot.self {
  border: 4px solid var(--c-accent-2, #c2410c);
}
.readout {
  font-size: 18px;
  line-height: 1.4;
  text-align: center;
}
</style>
