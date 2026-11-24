<script setup lang="ts">
// Pick a value for char base; the four DNA versions from the slides each
// show what they print: the plain if chain (uppercase only), the version
// with ||, the version with Character.toUpperCase, and the switch.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const NAMES: Record<string, string> = { A: 'Adenine', C: 'Cytosine', G: 'Guanine', T: 'Thymine' }
const NO = 'Your base doesn\'t belong to us'
const BASES = ['A', 'C', 'G', 'T', 'a', 'g', 'X']
const s = useSyncedState('dnademo', { b: 'A' })

const rows = computed(() => {
  const b = s.b
  const up = b.toUpperCase()
  const plain = NAMES[b] ?? NO
  const both = NAMES[up] ?? NO
  return [
    { v: 'if chain: base == \'A\'', out: plain },
    { v: 'if chain with ||', out: both },
    { v: 'Character.toUpperCase first', out: both },
    { v: 'switch with case \'A\': case \'a\':', out: both },
  ]
})
</script>

<template>
  <div class="dn" @keydown.stop>
    <div class="dn-pick" role="group" aria-label="Value of base">
      <code>char base =</code>
      <button
        v-for="b in BASES" :key="b" type="button" class="dn-pill"
        :class="{ on: s.b === b }" :aria-pressed="s.b === b" @click="s.b = b"
      >
        '{{ b }}'
      </button>
    </div>
    <div class="dn-rows" aria-live="polite">
      <div v-for="r in rows" :key="r.v" class="dn-row">
        <span class="dn-v">{{ r.v }}</span>
        <span class="dn-out" :class="{ no: r.out === NO }">{{ r.out }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dn { display: flex; flex-direction: column; gap: 14px; }
.dn-pick { display: flex; align-items: center; gap: 8px; font-size: 20px; }
.dn-pill { font-family: var(--slidev-font-mono, monospace); font-size: 20px; font-weight: 700; min-width: 54px; padding: 2px 10px; border-radius: 8px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); cursor: pointer; }
.dn-pill.on { background: var(--c-accent, #3730a3); color: #fff; }
.dn-rows { display: flex; flex-direction: column; gap: 8px; }
.dn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: center; font-size: 20px; }
.dn-v { font-family: var(--slidev-font-mono, monospace); font-size: 19px; }
.dn-out { font-family: var(--slidev-font-mono, monospace); font-weight: 700; padding: 3px 12px; border-radius: 8px; border: 2px solid var(--c-accent-2, #c2410c); background: var(--c-accent-2-soft, #fff7ed); }
.dn-out.no { font-weight: 400; font-size: 18px; border: 2px dashed #b91c1c; background: var(--c-paper, #fff); }
</style>
