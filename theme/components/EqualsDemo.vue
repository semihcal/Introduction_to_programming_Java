<script setup lang="ts">
// == compares references (same object?), equals() compares contents
// (same text?). Choose how s2 is created and see both results.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const choices = [
  { code: 'new String("identical")', alias: false, text: 'identical' },
  { code: 's1', alias: true, text: 'identical' },
  { code: 'new String("different")', alias: false, text: 'different' },
]

const s = useSyncedState('equals-demo', { pick: 0 })
const c = computed(() => choices[s.pick])
const same = computed(() => c.value.alias)
const equal = computed(() => c.value.text === 'identical')
const summary = computed(() => {
  if (c.value.alias)
    return 's1 and s2 point to one String object, so both tests are true.'
  if (equal.value)
    return 'Two separate String objects with the same text: == is false, equals() is true.'
  return 'Two separate String objects with different text: both tests are false.'
})
</script>

<template>
  <div class="eq" @keydown.stop>
    <div class="eq-pick" role="group" aria-label="Choose how s2 is created">
      <span class="eq-label">String s2 =</span>
      <button
        v-for="(ch, i) in choices"
        :key="ch.code"
        type="button"
        :class="{ on: s.pick === i }"
        :aria-pressed="s.pick === i"
        @click="s.pick = i"
      >
        {{ ch.code }};
      </button>
    </div>

    <div class="eq-main">
      <div class="mem" role="img" :aria-label="`Memory diagram. ${summary}`">
        <div class="mem-row">
          <span class="mem-name">s1</span><span class="mem-arrow" />
          <span class="mem-obj">String object<br><code>"identical"</code></span>
        </div>
        <div class="mem-row">
          <span class="mem-name">s2</span><span class="mem-arrow" />
          <span v-if="same" class="mem-obj eq-shared">the same object as s1</span>
          <span v-else class="mem-obj">String object<br><code>"{{ c.text }}"</code></span>
        </div>
      </div>

      <div class="eq-results" aria-live="polite">
        <div class="eq-row">
          <code>s1 == s2</code>
          <span class="eq-q">same object?</span>
          <b :class="same ? 'yes' : 'no'">{{ same }}</b>
        </div>
        <div class="eq-row">
          <code>s1.equals(s2)</code>
          <span class="eq-q">same text?</span>
          <b :class="equal ? 'yes' : 'no'">{{ equal }}</b>
        </div>
        <div class="eq-summary">
          {{ summary }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.eq {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.eq-pick {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.eq-label {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
  margin-right: 4px;
}
.eq-pick button {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 10px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.eq-pick button.on {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.eq-main {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 28px;
  align-items: center;
}
.eq-shared {
  font-style: italic;
}
.eq-results {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.eq-row {
  display: grid;
  grid-template-columns: 170px 1fr 70px;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
  font-size: 20px;
}
.eq-row code {
  font-size: 19px !important;
}
.eq-q {
  color: var(--c-muted, #475569);
  font-size: 18px;
}
.eq-row b {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  text-align: right;
}
.eq-row b.yes {
  color: var(--c-accent, #3730a3);
}
.eq-row b.no {
  color: var(--c-accent-2, #c2410c);
}
.eq-summary {
  font-size: 19px;
  line-height: 1.4;
  min-height: 54px;
}
</style>
