<script setup lang="ts">
// Celsius to Fahrenheit written two ways in Java: with (9 / 5), which is
// integer division and equals 1, and with 9.0 / 5, which equals 1.8.
// A slider sets the Celsius value; both results are shown side by side.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('tempdemo', { c: 100 })

function jd(x: number) {
  const t = String(x)
  return /[.e]/.test(t) ? t : `${t}.0`
}
// Same order of operations as the Java expressions.
const wrong = computed(() => jd(Math.trunc(9 / 5) * s.c + 32))
const right = computed(() => jd(9.0 / 5 * s.c + 32))
</script>

<template>
  <div class="td" @keydown.stop>
    <label class="td-slider">
      <span><code>double c = {{ jd(s.c) }};</code></span>
      <input v-model.number="s.c" type="range" min="-40" max="100" step="5" aria-label="Temperature in Celsius">
    </label>
    <div class="td-cols">
      <div class="td-card bad">
        <div class="td-code">
          (9 / 5) * c + 32
        </div>
        <div class="td-step">
          9 / 5 is int division → <b>1</b>
        </div>
        <div class="td-out">
          {{ wrong }} °F
        </div>
        <div class="td-tag">
          ✗ Wrong
        </div>
      </div>
      <div class="td-card good">
        <div class="td-code">
          9.0 / 5 * c + 32
        </div>
        <div class="td-step">
          9.0 / 5 is double division → <b>1.8</b>
        </div>
        <div class="td-out">
          {{ right }} °F
        </div>
        <div class="td-tag">
          ✓ Right
        </div>
      </div>
    </div>
    <p class="td-sum" aria-live="polite">
      {{ jd(s.c) }} °C: the int version gives {{ wrong }}, the double version gives {{ right }}.
    </p>
  </div>
</template>

<style scoped>
.td {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.td-slider {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
}
.td-slider input {
  flex: 1;
  accent-color: var(--c-accent, #3730a3);
}
.td-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.td-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
}
.td-card.bad {
  border-style: dashed;
  border-color: #b91c1c;
  background: var(--c-paper, #fff);
}
.td-code {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
}
.td-step {
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.td-out {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 36px;
  font-weight: 700;
}
.td-tag {
  font-size: 18px;
  font-weight: 700;
}
.td-sum {
  margin: 0;
  font-size: 18px;
  color: var(--c-muted, #475569);
}
</style>
