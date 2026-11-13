<script setup lang="ts">
// Works out how many bytes a Java array or String uses for a chosen length N.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const kinds = [
  { name: 'boolean[]', base: 16, per: 1 },
  { name: 'char[]', base: 16, per: 2 },
  { name: 'int[]', base: 16, per: 4 },
  { name: 'double[]', base: 16, per: 8 },
  { name: 'String', base: 40, per: 2 },
]

const calc = useSyncedState('memcalc', { kind: 2, n: 100 })

const kind = computed(() => kinds[calc.kind])
const bytes = computed(() => kind.value.base + kind.value.per * calc.n)
</script>

<template>
  <div class="mc" @keydown.stop>
    <div class="mc-kinds" role="group" aria-label="Choose a type">
      <button
        v-for="(k, i) in kinds"
        :key="k.name"
        type="button"
        :class="{ on: calc.kind === i }"
        :aria-pressed="calc.kind === i"
        @click="calc.kind = i"
      >
        {{ k.name }}
      </button>
    </div>
    <label class="mc-control">
      <span class="mc-caption">Number of elements N = <b>{{ calc.n.toLocaleString('en-US') }}</b></span>
      <input v-model.number="calc.n" type="range" min="0" max="1000" step="10">
    </label>
    <div class="mc-result" aria-live="polite">
      <div class="mc-formula">
        {{ kind.name }}: {{ kind.base }} + {{ kind.per === 1 ? '' : `${kind.per} × ` }}N
      </div>
      <div class="mc-worked">
        {{ kind.base }} + {{ kind.per }} × {{ calc.n.toLocaleString('en-US') }} = <b>{{ bytes.toLocaleString('en-US') }} bytes</b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mc {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.mc-kinds {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.mc-kinds button {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 21px;
  font-weight: 700;
  padding: 5px 18px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.mc-kinds button.on {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.mc-control {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
  font-size: 24px;
  padding: 10px 18px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.mc-caption {
  white-space: nowrap;
}
.mc-caption b {
  display: inline-block;
  min-width: 5ch;
  font-variant-numeric: tabular-nums;
}
.mc-control input {
  width: 100%;
  min-width: 0;
  margin: 0;
  height: 28px;
  accent-color: var(--c-accent, #3730a3);
}
.mc-result {
  padding: 14px 22px;
  border-radius: 16px;
  border: 3px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.mc-formula {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
}
.mc-worked {
  margin-top: 6px;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 30px;
  font-variant-numeric: tabular-nums;
}
</style>
