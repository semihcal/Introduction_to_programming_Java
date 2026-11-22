<script setup lang="ts">
// Two booleans, x and y, each toggled with a button, and the four boolean
// operators applied to them: !x, x && y, x || y, x ^ y.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('booldemo', { x: true, y: false })

const rows = computed(() => [
  { code: '!x', val: !s.x, why: s.x ? 'x is true, so NOT x is false' : 'x is false, so NOT x is true' },
  { code: 'x && y', val: s.x && s.y, why: s.x && s.y ? 'both are true' : 'AND needs both to be true' },
  { code: 'x || y', val: s.x || s.y, why: s.x || s.y ? 'at least one is true' : 'OR needs at least one true' },
  { code: 'x ^ y', val: s.x !== s.y, why: s.x !== s.y ? 'exactly one is true' : 'XOR needs exactly one true' },
])
</script>

<template>
  <div class="bd" @keydown.stop>
    <div class="bd-vars">
      <button
        v-for="k in (['x', 'y'] as const)" :key="k" type="button" class="bd-var"
        :class="{ on: s[k] }" :aria-label="`Toggle ${k}, now ${s[k]}`" @click="s[k] = !s[k]"
      >
        <span class="bd-name">boolean {{ k }} =</span>
        <span class="bd-v">{{ s[k] }}</span>
      </button>
    </div>
    <div class="bd-rows" aria-live="polite">
      <div v-for="r in rows" :key="r.code" class="bd-row">
        <code class="bd-code">{{ r.code }}</code>
        <span class="bd-res" :class="{ on: r.val }">{{ r.val }}</span>
        <span class="bd-why">{{ r.why }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.bd-vars {
  display: flex;
  gap: 16px;
}
.bd-var {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 3px dashed var(--c-line, #94a3b8);
  background: var(--c-paper, #fff);
  font: inherit;
  font-size: 22px;
  cursor: pointer;
}
.bd-var.on {
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
}
.bd-name {
  font-family: var(--slidev-font-mono, monospace);
  color: var(--c-muted, #475569);
}
.bd-v {
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
  min-width: 70px;
  text-align: left;
}
.bd-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bd-row {
  display: grid;
  grid-template-columns: 150px 110px 1fr;
  align-items: center;
  gap: 12px;
  font-size: 20px;
}
.bd-code {
  font-size: 22px !important;
}
.bd-res {
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  padding: 2px 8px;
  border-radius: 8px;
  border: 2px dashed var(--c-line, #94a3b8);
}
.bd-res.on {
  border: 2px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.bd-why {
  color: var(--c-muted, #475569);
}
</style>
