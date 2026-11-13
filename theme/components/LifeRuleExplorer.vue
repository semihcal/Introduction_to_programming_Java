<script setup lang="ts">
// One cell and its 8 neighbors. Toggle cells to see which rule applies.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const rules = useSyncedState('rules', {
  cells: [
    false, true, false,
    false, true, false,
    true, false, false,
  ],
})

const center = computed(() => rules.cells[4])
const neighbors = computed(() => rules.cells.filter((v, i) => v && i !== 4).length)

const verdict = computed(() => {
  const n = neighbors.value
  if (center.value) {
    if (n < 2)
      return { lives: false, text: 'Dies of loneliness (fewer than 2)' }
    if (n > 3)
      return { lives: false, text: 'Dies of overcrowding (more than 3)' }
    return { lives: true, text: 'Keeps living (2 or 3)' }
  }
  if (n === 3)
    return { lives: true, text: 'Comes to life (exactly 3)' }
  return { lives: false, text: 'Stays dead (not exactly 3)' }
})

function toggle(i: number) {
  rules.cells[i] = !rules.cells[i]
}
</script>

<template>
  <div class="explorer" @keydown.stop>
    <div class="grid" role="group" aria-label="A center cell and its 8 neighbors. Click any cell to toggle it.">
      <button
        v-for="(on, i) in rules.cells"
        :key="i"
        type="button"
        class="cell"
        :class="{ on, center: i === 4 }"
        :aria-pressed="on"
        :aria-label="`${i === 4 ? 'Center cell' : 'Neighbor'}: ${on ? 'alive' : 'dead'}`"
        @click="toggle(i)"
      >
        {{ i === 4 ? 'cell' : '' }}
      </button>
    </div>
    <div class="readout" aria-live="polite">
      <div>Cell is <b>{{ center ? 'alive' : 'dead' }}</b> · live neighbors: <b>{{ neighbors }}</b></div>
      <div class="verdict" :class="{ lives: verdict.lives }">
        <span aria-hidden="true">{{ verdict.lives ? '●' : '○' }}</span>
        Next: {{ verdict.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.explorer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 72px);
  grid-auto-rows: 72px;
  gap: 4px;
}
.cell {
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 10px;
  background: var(--c-dead, #fff);
  color: var(--c-ink, #0f172a);
  font: inherit;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
.cell.on {
  background: var(--c-alive, #0f172a);
  color: #fff;
}
.cell.center {
  border: 4px solid var(--c-accent-2, #c2410c);
}
.readout {
  font-size: 20px;
  text-align: center;
  line-height: 1.5;
}
.verdict {
  font-weight: 700;
  color: var(--c-accent-2, #c2410c);
}
.verdict.lives {
  color: var(--c-accent, #3730a3);
}
</style>
