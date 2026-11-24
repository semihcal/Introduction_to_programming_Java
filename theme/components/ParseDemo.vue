<script setup lang="ts">
// Pick a String and see what Integer.parseInt and Double.parseDouble do with
// it. The results are fixed per preset, matching what Java prints, including
// NumberFormatException for text that is not a number of that type.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const NFE = 'NumberFormatException'
const PRESETS = [
  { s: '847', i: '847', d: '847.0', why: 'Digits only: both work. parseDouble adds .0.' },
  { s: '-0.4581', i: NFE, d: '-0.4581', why: 'A decimal point is not allowed in an int, so parseInt crashes.' },
  { s: '6.02e23', i: NFE, d: '6.02E23', why: 'Scientific notation is a double. Java prints it with a capital E.' },
  { s: '007', i: '7', d: '7.0', why: 'Leading zeros are allowed and simply disappear.' },
  { s: '12abc', i: NFE, d: NFE, why: 'Letters make it not a number at all: both crash.' },
  { s: '', i: NFE, d: NFE, why: 'The empty String is not a number either.' },
]

const s = useSyncedState('parsedemo', { k: 0 })
const p = computed(() => PRESETS[s.k])
</script>

<template>
  <div class="pd" @keydown.stop>
    <div class="pd-pick" role="group" aria-label="String to parse">
      <button
        v-for="(q, k) in PRESETS" :key="k" type="button" class="pd-pill"
        :class="{ on: s.k === k }" :aria-pressed="s.k === k" @click="s.k = k"
      >
        "{{ q.s }}"
      </button>
    </div>
    <div class="pd-rows">
      <div class="pd-row">
        <code>Integer.parseInt("{{ p.s }}")</code>
        <span class="pd-res" :class="{ err: p.i === NFE }">{{ p.i }}</span>
      </div>
      <div class="pd-row">
        <code>Double.parseDouble("{{ p.s }}")</code>
        <span class="pd-res" :class="{ err: p.d === NFE }">{{ p.d }}</span>
      </div>
    </div>
    <p class="pd-why" aria-live="polite">
      parseInt gives {{ p.i }}; parseDouble gives {{ p.d }}. {{ p.why }}
    </p>
  </div>
</template>

<style scoped>
.pd {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pd-pick {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pd-pill {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
  min-width: 60px;
  padding: 3px 14px;
  border-radius: 999px;
  border: 2px solid var(--c-accent-2, #c2410c);
  background: var(--c-paper, #fff);
  color: var(--c-accent-2, #c2410c);
  cursor: pointer;
}
.pd-pill.on {
  background: var(--c-accent-2, #c2410c);
  color: #fff;
}
.pd-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pd-row {
  display: grid;
  grid-template-columns: 1fr 300px;
  align-items: center;
  gap: 14px;
  font-size: 22px;
}
.pd-row code {
  font-size: 22px !important;
}
.pd-res {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 26px;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 10px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
}
.pd-res.err {
  font-size: 20px;
  border-style: dashed;
  border-color: #b91c1c;
  background: var(--c-paper, #fff);
}
.pd-why {
  margin: 0;
  font-size: 20px;
  padding: 8px 14px;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 10px;
}
</style>
