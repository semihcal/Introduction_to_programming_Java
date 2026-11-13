<script setup lang="ts">
// The eight common complexity classes evaluated at a chosen n (1 to 100).
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const state = useSyncedState('bigoh-table', { n: 100 })

function factorial(n: number) {
  let f = 1
  for (let i = 2; i <= n; i++)
    f *= i
  return f
}

const rows = computed(() => {
  const n = state.n
  const lg = Math.log2(n)
  return [
    { name: 'Constant', big: 'O(1)', value: 1 },
    { name: 'Logarithmic', big: 'O(log n)', value: lg },
    { name: 'Linear', big: 'O(n)', value: n },
    { name: 'Linearithmic', big: 'O(n log n)', value: n * lg },
    { name: 'Quadratic', big: 'O(n²)', value: n ** 2 },
    { name: 'Cubic', big: 'O(n³)', value: n ** 3 },
    { name: 'Exponential', big: 'O(2ⁿ)', value: 2 ** n },
    { name: 'Factorial', big: 'O(n!)', value: factorial(n) },
  ]
})

// Small numbers are written out; large ones as mantissa × 10 to a power.
function parts(v: number) {
  if (v < 1e7) {
    return { text: v.toLocaleString('en-US', { maximumFractionDigits: 2 }), exp: '' }
  }
  const [m, e] = v.toExponential(2).split('e')
  return { text: `${m} × 10`, exp: String(Number(e)) }
}

// Bar length follows the number of digits, so every row stays visible.
const width = (v: number) => `${Math.max((Math.log10(v + 1) / 158) * 100, 0.6)}%`
</script>

<template>
  <div class="bo" @keydown.stop>
    <label class="bo-control">
      <span class="bo-caption">Input size n = <b>{{ state.n }}</b></span>
      <input v-model.number="state.n" type="range" min="1" max="100" step="1">
    </label>
    <table class="bo-table" aria-live="polite">
      <thead>
        <tr>
          <th>Description</th>
          <th>Big Oh</th>
          <th class="bo-num">
            f({{ state.n }})
          </th>
          <th class="bo-barhead">
            Digits
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td>{{ row.name }}</td>
          <td class="bo-big">
            {{ row.big }}
          </td>
          <td class="bo-num">
            {{ parts(row.value).text }}<sup v-if="parts(row.value).exp">{{ parts(row.value).exp }}</sup>
          </td>
          <td class="bo-barcell">
            <div class="bo-bar" :style="{ width: width(row.value) }" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.bo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bo-control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
  font-size: 22px;
  padding: 6px 18px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.bo-caption {
  white-space: nowrap;
}
.bo-caption b {
  display: inline-block;
  min-width: 3ch;
  font-variant-numeric: tabular-nums;
}
.bo-control input {
  width: 100%;
  min-width: 0;
  margin: 0;
  height: 26px;
  accent-color: var(--c-accent, #3730a3);
}
.bo-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px !important;
}
.bo-table th,
.bo-table td {
  padding: 3px 14px 3px 0 !important;
  text-align: left;
  white-space: nowrap;
}
.bo-big {
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
}
.bo-num {
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
  text-align: right !important;
  font-variant-numeric: tabular-nums;
  width: 210px;
}
.bo-num sup {
  font-size: 0.7em;
}
.bo-barhead,
.bo-barcell {
  width: 30%;
  padding-left: 14px !important;
}
.bo-bar {
  height: 16px;
  border-radius: 5px;
  background: var(--c-accent, #3730a3);
  transition: width 0.15s ease;
}
</style>
