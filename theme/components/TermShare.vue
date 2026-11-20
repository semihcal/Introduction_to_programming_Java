<script setup lang="ts">
// How much of a running time each term contributes as n grows. Presets:
//   cubic: 147n³ + 2n² + 5n + 12083
//   mult:  multiplying two n-digit numbers by hand, counted as on the slide
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ preset?: 'cubic' | 'mult' }>(), { preset: 'cubic' })

interface Term { label: string, f: (n: number) => number }
const PRESETS: Record<string, { name: string, max: number, start: number, terms: Term[], bigOh: string }> = {
  cubic: {
    name: 'n',
    max: 100,
    start: 1,
    bigOh: 'O(n³)',
    terms: [
      { label: '147n³', f: n => 147 * n ** 3 },
      { label: '2n²', f: n => 2 * n ** 2 },
      { label: '5n', f: n => 5 * n },
      { label: '12083', f: () => 12083 },
    ],
  },
  mult: {
    name: 'digits n',
    max: 30,
    start: 3,
    bigOh: 'O(n²)',
    terms: [
      { label: 'multiplications: n × n', f: n => n * n },
      { label: 'carries: n × n', f: n => n * n },
      { label: 'additions: (n + 1) × n', f: n => (n + 1) * n },
    ],
  },
}

const cfg = PRESETS[props.preset]
const s = useSyncedState(`termshare-${props.preset}`, { n: cfg.start })

const rows = computed(() => {
  const values = cfg.terms.map(t => t.f(s.n))
  const total = values.reduce((a, b) => a + b, 0)
  return {
    total,
    list: cfg.terms.map((t, i) => ({ label: t.label, value: values[i], share: values[i] / total })),
  }
})
const fmt = (v: number) => v.toLocaleString('en-US')
const pct = (x: number) => x >= 0.9995 ? '99.9+%' : `${(x * 100).toFixed(1)}%`
</script>

<template>
  <div class="ts" @keydown.stop>
    <label class="ts-control">
      <span class="ts-caption">{{ cfg.name }} = <b>{{ s.n }}</b></span>
      <input v-model.number="s.n" type="range" min="1" :max="cfg.max" step="1">
    </label>

    <div class="ts-rows" aria-live="polite">
      <div v-for="r in rows.list" :key="r.label" class="ts-row">
        <div class="ts-label">
          {{ r.label }}
        </div>
        <div class="ts-track">
          <div class="ts-bar" :style="{ width: `${Math.max(r.share * 100, 0.4)}%` }" />
        </div>
        <div class="ts-value">
          {{ fmt(r.value) }}
        </div>
        <div class="ts-pct">
          {{ pct(r.share) }}
        </div>
      </div>
      <div class="ts-total">
        Total: <b>{{ fmt(rows.total) }}</b> steps · Big Oh: <b>{{ cfg.bigOh }}</b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.ts-control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
  font-size: 22px;
  padding: 8px 18px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.ts-caption {
  white-space: nowrap;
}
.ts-caption b {
  display: inline-block;
  min-width: 3ch;
  font-variant-numeric: tabular-nums;
}
.ts-control input {
  width: 100%;
  min-width: 0;
  margin: 0;
  height: 26px;
  accent-color: var(--c-accent, #3730a3);
}
.ts-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ts-row {
  display: grid;
  grid-template-columns: 260px 1fr 150px 80px;
  align-items: center;
  gap: 12px;
}
.ts-label {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 19px;
  font-weight: 700;
}
.ts-track {
  height: 24px;
  border-radius: 8px;
  background: var(--c-accent-soft, #eef2ff);
  border: 1px solid var(--c-line, #94a3b8);
  overflow: hidden;
}
.ts-bar {
  height: 100%;
  background: var(--c-accent, #3730a3);
  transition: width 0.15s ease;
}
.ts-value,
.ts-pct {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 19px;
  font-weight: 700;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.ts-pct {
  color: var(--c-muted, #475569);
}
.ts-total {
  margin-top: 4px;
  font-size: 21px;
}
</style>
