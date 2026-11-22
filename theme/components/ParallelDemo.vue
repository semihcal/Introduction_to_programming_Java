<script setup lang="ts">
// Loads of laundry and washing machines: with W washers, L loads take
// ceil(L / W) rounds. More washers only help while there are loads left
// to share out.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('parallel-demo', { loads: 3, washers: 1 })

const rounds = computed(() => Math.ceil(s.loads / s.washers))
const idle = computed(() => Math.max(s.washers - s.loads, 0))
const speedup = computed(() => s.loads / rounds.value)
const grid = computed(() => {
  // For each washer, which load numbers it washes, round by round.
  return Array.from({ length: s.washers }, (_, w) =>
    Array.from({ length: rounds.value }, (_, r) => {
      const load = r * s.washers + w + 1
      return load <= s.loads ? load : 0
    }))
})
const summary = computed(() => {
  const base = `${s.loads} loads with ${s.washers} washer${s.washers > 1 ? 's' : ''}: ${rounds.value} round${rounds.value > 1 ? 's' : ''} of washing.`
  if (idle.value > 0)
    return `${base} ${idle.value} washer${idle.value > 1 ? 's sit' : ' sits'} idle: there is nothing for ${idle.value > 1 ? 'them' : 'it'} to do.`
  if (s.washers === 1)
    return `${base} One washer does one load at a time.`
  return `${base} That is ${speedup.value.toFixed(1)} times as fast as one washer.`
})
</script>

<template>
  <div class="pl" @keydown.stop>
    <div class="pl-controls">
      <label class="pl-control">
        <span>Loads of laundry: <b>{{ s.loads }}</b></span>
        <input v-model.number="s.loads" type="range" min="1" max="8" step="1">
      </label>
      <label class="pl-control">
        <span>Washers (cores): <b>{{ s.washers }}</b></span>
        <input v-model.number="s.washers" type="range" min="1" max="8" step="1">
      </label>
    </div>

    <div class="pl-grid" role="img" :aria-label="summary">
      <div class="pl-head">
        <span />
        <span v-for="r in rounds" :key="r">round {{ r }}</span>
      </div>
      <div v-for="(row, w) in grid" :key="w" class="pl-row">
        <span class="pl-name">washer {{ w + 1 }}</span>
        <span v-for="(load, r) in row" :key="r" class="pl-cell" :class="{ empty: load === 0 }">
          {{ load ? `load ${load}` : 'idle' }}
        </span>
      </div>
    </div>

    <div class="pl-summary" aria-live="polite">
      {{ summary }}
    </div>
  </div>
</template>

<style scoped>
.pl {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pl-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.pl-control {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 20px;
  padding: 6px 16px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.pl-control b {
  font-variant-numeric: tabular-nums;
}
.pl-control input {
  width: 100%;
  margin: 0;
  height: 24px;
  accent-color: var(--c-accent, #3730a3);
}
.pl-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 230px;
  overflow: hidden;
}
.pl-head,
.pl-row {
  display: grid;
  grid-template-columns: 110px repeat(8, 96px);
  gap: 4px;
  align-items: center;
}
.pl-head span {
  font-size: 18px;
  color: var(--c-muted, #475569);
  text-align: center;
}
.pl-name {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
}
.pl-cell {
  padding: 2px 0;
  border-radius: 8px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}
.pl-cell.empty {
  border-style: dashed;
  border-color: var(--c-line, #94a3b8);
  background: transparent;
  color: var(--c-muted, #475569);
  font-weight: 400;
}
.pl-summary {
  font-size: 20px;
  line-height: 1.4;
  min-height: 56px;
}
</style>
