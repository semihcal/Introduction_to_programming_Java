<script setup lang="ts">
// Compare how many steps O(1), O(n) and O(n^2) code takes as n grows.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const state = useSyncedState('growth', { n: 10 })

const rows = computed(() => {
  const n = state.n
  return [
    { name: 'Largest of a sorted array', big: 'O(1)', formula: '1 lookup', count: 1 },
    { name: 'Largest of any array', big: 'O(n)', formula: 'n − 1 comparisons', count: Math.max(n - 1, 0) },
    { name: 'Bubble sort', big: 'O(n²)', formula: 'n × (n − 1) comparisons', count: n * (n - 1) },
  ]
})

const max = computed(() => Math.max(...rows.value.map(r => r.count), 1))
</script>

<template>
  <div class="growth" @keydown.stop>
    <label class="n-control">
      <span class="caption">Array length n = <b>{{ state.n }}</b></span>
      <input v-model.number="state.n" type="range" min="1" max="100" step="1">
    </label>
    <div class="rows" aria-live="polite">
      <div v-for="row in rows" :key="row.big" class="row">
        <div class="label">
          <b>{{ row.big }}</b> · {{ row.name }}
          <span class="formula">{{ row.formula }}</span>
        </div>
        <div class="track">
          <div class="bar" :style="{ width: `${Math.max((row.count / max) * 100, 0.4)}%` }" />
        </div>
        <div class="count">
          {{ row.count.toLocaleString('en-US') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.growth {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.n-control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  padding: 10px 18px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.caption {
  white-space: nowrap;
}
.caption b {
  display: inline-block;
  min-width: 3ch;
  font-variant-numeric: tabular-nums;
}
.n-control input {
  width: 100%;
  min-width: 0;
  margin: 0;
  height: 28px;
  accent-color: var(--c-accent, #3730a3);
}
.rows {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 90px;
  grid-template-areas: 'label count' 'track count';
  column-gap: 16px;
  row-gap: 6px;
  align-items: center;
}
.label {
  grid-area: label;
  font-size: 22px;
}
.formula {
  margin-left: 10px;
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.track {
  grid-area: track;
  height: 26px;
  border-radius: 8px;
  background: var(--c-accent-soft, #eef2ff);
  border: 1px solid var(--c-line, #94a3b8);
  overflow: hidden;
}
.bar {
  height: 100%;
  background: var(--c-accent, #3730a3);
  transition: width 0.15s ease;
}
.count {
  grid-area: count;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 26px;
  font-weight: 700;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
</style>
