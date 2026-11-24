<script setup lang="ts">
// Pick a char and see the four Character tests: isDigit, isLetter,
// isUpperCase, isLowerCase.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const CHARS = ['8', 'q', 'Q', '$', ' ', 'é']
const s = useSyncedState('charinfo', { k: 0 })
const c = computed(() => CHARS[s.k])
const tests = computed(() => {
  const ch = c.value
  const letter = /\p{L}/u.test(ch)
  return [
    { m: 'isDigit', v: /\d/.test(ch) },
    { m: 'isLetter', v: letter },
    { m: 'isUpperCase', v: letter && ch === ch.toUpperCase() && ch !== ch.toLowerCase() },
    { m: 'isLowerCase', v: letter && ch === ch.toLowerCase() && ch !== ch.toUpperCase() },
  ]
})
const lit = (ch: string) => `'${ch}'`
</script>

<template>
  <div class="ci" @keydown.stop>
    <div class="ci-pick" role="group" aria-label="Character">
      <button
        v-for="(ch, k) in CHARS" :key="k" type="button" class="ci-pill"
        :class="{ on: s.k === k }" :aria-pressed="s.k === k" :aria-label="ch === ' ' ? 'space' : ch" @click="s.k = k"
      >
        {{ lit(ch) }}
      </button>
    </div>
    <div class="ci-rows" aria-live="polite">
      <div v-for="t in tests" :key="t.m" class="ci-row">
        <code>Character.{{ t.m }}({{ lit(c) }})</code>
        <span class="ci-res" :class="{ on: t.v }">{{ t.v }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ci {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ci-pick {
  display: flex;
  gap: 8px;
}
.ci-pill {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
  min-width: 64px;
  padding: 3px 12px;
  border-radius: 10px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
  white-space: pre;
}
.ci-pill.on {
  background: var(--c-accent, #3730a3);
  color: #fff;
}
.ci-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ci-row {
  display: grid;
  grid-template-columns: 1fr 110px;
  align-items: center;
  gap: 12px;
}
.ci-row code {
  font-size: 20px !important;
  white-space: pre;
}
.ci-res {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  padding: 2px 8px;
  border-radius: 8px;
  border: 2px dashed var(--c-line, #94a3b8);
}
.ci-res.on {
  border: 2px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
</style>
