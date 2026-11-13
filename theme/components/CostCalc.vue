<script setup lang="ts">
// The Vehicle cost example: Car and Truck override calculateCost, and
// Vehicle adds $10 insurance when the object is a Truck (instanceof).
// The numbers and formulas are example values for the lecture.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const FUEL_PRICE = 3.5

const s = useSyncedState('costcalc', { kind: 'Car' as 'Vehicle' | 'Car' | 'Truck', distance: 100 })

const money = (v: number) => `$${v.toFixed(2)}`

const lines = computed(() => {
  const d = s.distance
  const out: { label: string, value: number, from: string }[] = []
  if (s.kind === 'Vehicle') {
    out.push({ label: `${d} miles × $0.50 per mile`, value: d * 0.5, from: 'Vehicle' })
  }
  else if (s.kind === 'Car') {
    out.push({ label: `${d} miles × $0.40 per mile`, value: d * 0.4, from: 'Vehicle' })
    out.push({ label: `Fuel: ${d} ÷ 30 miles per gallon × $${FUEL_PRICE.toFixed(2)}`, value: d / 30 * FUEL_PRICE, from: 'Car' })
  }
  else {
    out.push({ label: `${d} miles × $0.90 per mile`, value: d * 0.9, from: 'Vehicle' })
    out.push({ label: 'Insurance: this instanceof Truck', value: 10, from: 'Vehicle' })
    out.push({ label: 'Load: 2,000 pounds × $0.02', value: 2000 * 0.02, from: 'Truck' })
  }
  return out
})
const total = computed(() => lines.value.reduce((sum, l) => sum + l.value, 0))
</script>

<template>
  <div class="cc" @keydown.stop>
    <div class="cc-top">
      <div class="cc-kinds" role="group" aria-label="Choose the vehicle type">
        <button
          v-for="k in (['Vehicle', 'Car', 'Truck'] as const)"
          :key="k"
          type="button"
          :class="{ on: s.kind === k }"
          :aria-pressed="s.kind === k"
          @click="s.kind = k"
        >
          {{ k }}
        </button>
      </div>
      <label class="cc-control">
        <span class="cc-caption">Distance = <b>{{ s.distance }}</b> miles</span>
        <input v-model.number="s.distance" type="range" min="0" max="500" step="10">
      </label>
    </div>

    <table class="cc-table" aria-live="polite">
      <thead>
        <tr>
          <th>Part of the cost</th>
          <th>Code in</th>
          <th class="cc-num">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in lines" :key="l.label">
          <td>{{ l.label }}</td>
          <td class="cc-from">
            {{ l.from }}
          </td>
          <td class="cc-num">
            {{ money(l.value) }}
          </td>
        </tr>
        <tr class="cc-total">
          <td>{{ s.kind.toLowerCase() }}.calculateCost({{ s.distance }})</td>
          <td />
          <td class="cc-num">
            {{ money(total) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.cc {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cc-top {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 18px;
  align-items: center;
}
.cc-kinds {
  display: flex;
  gap: 8px;
}
.cc-kinds button {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
  padding: 4px 18px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.cc-kinds button.on {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.cc-control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 16px;
  font-size: 21px;
  padding: 6px 16px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.cc-caption {
  white-space: nowrap;
}
.cc-caption b {
  display: inline-block;
  min-width: 3ch;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.cc-control input {
  width: 100%;
  min-width: 0;
  margin: 0;
  height: 26px;
  accent-color: var(--c-accent, #3730a3);
}
.cc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 21px !important;
}
.cc-table th,
.cc-table td {
  padding: 6px 14px 6px 0 !important;
  text-align: left;
}
.cc-from {
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
}
.cc-num {
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
  text-align: right !important;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.cc-total td {
  border-top: 3px solid var(--c-ink, #0f172a);
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
  font-size: 23px;
}
</style>
