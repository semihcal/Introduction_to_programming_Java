<script setup lang="ts">
// Nested while loops that print a triangle: row r prints r symbols. A
// slider sets n; a toggle switches between stars and the numbers 1..r.
// The total number of inner-loop passes is the nth triangular number.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('nestedstars', { n: 4, nums: false })
const rows = computed(() => Array.from({ length: s.n }, (_, r) =>
  Array.from({ length: r + 1 }, (_, c) => (s.nums ? String(c + 1) : '*')).join(s.nums ? ' ' : '')))
const total = computed(() => (s.n * (s.n + 1)) / 2)
const sum = computed(() => Array.from({ length: s.n }, (_, k) => k + 1).join(' + '))
</script>

<template>
  <div class="ns" @keydown.stop>
    <div class="ns-ctl">
      <label><code>n = {{ s.n }}</code> <input v-model.number="s.n" type="range" min="1" max="8" step="1" aria-label="n"></label>
      <label class="ns-tog"><input v-model="s.nums" type="checkbox"> print numbers instead of stars</label>
    </div>
    <div class="ns-cols">
      <div class="ns-code">
        <div>int row = 1;</div>
        <div>while (row &lt;= n) {</div>
        <div class="in">&nbsp;&nbsp;int col = 1;</div>
        <div class="in">&nbsp;&nbsp;while (col &lt;= row) {</div>
        <div class="in2">&nbsp;&nbsp;&nbsp;&nbsp;System.out.print({{ s.nums ? 'col + " "' : '"*"' }});</div>
        <div class="in2">&nbsp;&nbsp;&nbsp;&nbsp;++col;</div>
        <div class="in">&nbsp;&nbsp;}</div>
        <div class="in">&nbsp;&nbsp;System.out.println();</div>
        <div class="in">&nbsp;&nbsp;++row;</div>
        <div>}</div>
      </div>
      <div class="ns-con">
        <div class="ns-h">
          Console
        </div>
        <div v-for="(r, k) in rows" :key="k">
          {{ r }}
        </div>
      </div>
    </div>
    <p class="ns-sum" aria-live="polite">
      The inner loop body ran {{ sum }} = <b>{{ total }}</b> times: the {{ s.n }}{{ s.n === 1 ? 'st' : s.n === 2 ? 'nd' : s.n === 3 ? 'rd' : 'th' }} triangular number.
    </p>
  </div>
</template>

<style scoped>
.ns { display: flex; flex-direction: column; gap: 10px; }
.ns-ctl { display: flex; align-items: center; gap: 28px; font-size: 20px; }
.ns-ctl label { display: flex; align-items: center; gap: 10px; }
.ns-ctl input[type=range] { width: 220px; accent-color: var(--c-accent, #3730a3); }
.ns-tog input { width: 20px; height: 20px; accent-color: var(--c-accent-2, #c2410c); }
.ns-cols { display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; }
.ns-code { font-family: var(--slidev-font-mono, monospace); font-size: 18px; line-height: 1.4; padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); }
.ns-code .in { color: var(--c-accent, #3730a3); }
.ns-code .in2 { color: var(--c-accent-2, #c2410c); font-weight: 700; }
.ns-con { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.25; padding: 8px 14px; border-radius: 12px; background: #0f172a; color: #e2e8f0; white-space: pre; }
.ns-h { font-size: 18px; color: #94a3b8; margin-bottom: 4px; }
.ns-sum { margin: 0; font-size: 20px; }
</style>
