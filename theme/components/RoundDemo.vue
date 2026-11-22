<script setup lang="ts">
// A double on a number line from -3 to 3, and what four conversions give:
// (int) cast (drops the fraction, toward zero), Math.round (nearest, halves
// go up), Math.floor (down) and Math.ceil (up). Values are printed the way
// Java prints them: floor and ceil return doubles, including -0.0.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ start?: number }>(), { start: 2.6 })
const s = useSyncedState(`rounddemo-${props.start}`, { tenths: Math.round(props.start * 10) })

const x = computed(() => s.tenths / 10)
const jd = (v: number) => (Object.is(v, -0) ? '-0.0' : Number.isInteger(v) ? `${v}.0` : String(v))
const jl = (v: number) => String(v === 0 ? 0 : v)
const rows = computed(() => [
  { code: '(int) x', val: jl(Math.trunc(x.value)), why: 'drops the fraction (toward zero)' },
  { code: 'Math.round(x)', val: jl(Math.round(x.value)), why: 'nearest whole number; .5 goes up' },
  { code: 'Math.floor(x)', val: jd(Math.floor(x.value)), why: 'next whole number down' },
  { code: 'Math.ceil(x)', val: jd(Math.ceil(x.value)), why: 'next whole number up' },
])
const pos = (v: number) => 30 + (v + 3) * 100
</script>

<template>
  <div class="rd" @keydown.stop>
    <label class="rd-slider">
      <code>double x = {{ x.toFixed(1) }};</code>
      <input v-model.number="s.tenths" type="range" min="-30" max="30" step="1" aria-label="Value of x">
    </label>
    <svg viewBox="0 0 660 70" class="rd-line" role="img" :aria-label="`Number line from -3 to 3 with x at ${x.toFixed(1)}`">
      <line x1="30" y1="40" x2="630" y2="40" class="rd-axis" />
      <g v-for="k in 7" :key="k">
        <line :x1="pos(k - 4)" y1="32" :x2="pos(k - 4)" y2="48" class="rd-axis" />
        <text :x="pos(k - 4)" y="68" class="rd-num">{{ k - 4 }}</text>
      </g>
      <circle :cx="pos(x)" cy="40" r="9" class="rd-dot" />
      <text :x="pos(x)" y="20" class="rd-x">x</text>
    </svg>
    <table class="rd-tab">
      <tbody>
        <tr v-for="r in rows" :key="r.code">
          <td><code>{{ r.code }}</code></td>
          <td class="rd-val">
            {{ r.val }}
          </td>
          <td class="rd-why">
            {{ r.why }}
          </td>
        </tr>
      </tbody>
    </table>
    <p class="sr-only" aria-live="polite">
      x is {{ x.toFixed(1) }}. {{ rows.map(r => `${r.code} is ${r.val}`).join('. ') }}.
    </p>
  </div>
</template>

<style scoped>
.rd {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.rd-slider {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
}
.rd-slider input {
  flex: 1;
  accent-color: var(--c-accent, #3730a3);
}
.rd-line {
  width: 100%;
  max-height: 80px;
}
.rd-axis {
  stroke: var(--c-ink, #0f172a);
  stroke-width: 2;
}
.rd-num {
  text-anchor: middle;
  font-size: 18px;
  fill: var(--c-muted, #475569);
}
.rd-dot {
  fill: var(--c-accent-2, #c2410c);
}
.rd-x {
  text-anchor: middle;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  fill: var(--c-accent-2, #c2410c);
}
.rd-tab {
  font-size: 20px !important;
}
.rd-tab td {
  padding: 3px 10px !important;
}
.rd-val {
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
  font-size: 22px;
  color: var(--c-accent, #3730a3);
  min-width: 70px;
}
.rd-why {
  color: var(--c-muted, #475569);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
