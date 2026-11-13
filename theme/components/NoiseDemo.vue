<script setup lang="ts">
// One Mammal reference, four possible objects. Calling makeNoise() runs the
// version that belongs to the object, not to the reference type.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const kinds = [
  { name: 'Mammal', noise: 'Grunt!', overrides: false },
  { name: 'Dog', noise: 'Woof', overrides: true },
  { name: 'Cat', noise: 'Meow', overrides: true },
  { name: 'Human', noise: 'Hello', overrides: true },
]

const s = useSyncedState('noise', { pick: 1 })
const kind = computed(() => kinds[s.pick])
</script>

<template>
  <div class="nd" @keydown.stop>
    <div class="nd-kinds" role="group" aria-label="Choose the object to create">
      <span class="nd-label">Create a</span>
      <button
        v-for="(k, i) in kinds"
        :key="k.name"
        type="button"
        :class="{ on: s.pick === i }"
        :aria-pressed="s.pick === i"
        @click="s.pick = i"
      >
        {{ k.name }}
      </button>
    </div>

    <pre class="nd-code">Mammal m = new {{ kind.name }}();
m.makeNoise();</pre>

    <div class="nd-out" aria-live="polite">
      <div class="nd-print">
        Prints: <b>{{ kind.noise }}</b>
      </div>
      <div class="nd-why">
        <template v-if="kind.overrides">
          {{ kind.name }} overrides makeNoise(), so the {{ kind.name }} version runs.
        </template>
        <template v-else>
          A plain Mammal has only the original makeNoise().
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nd {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.nd-kinds {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nd-label {
  font-size: 21px;
  font-weight: 600;
  margin-right: 4px;
}
.nd-kinds button {
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
.nd-kinds button.on {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.nd-code {
  margin: 0;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 24px;
  line-height: 1.45;
}
.nd-out {
  padding: 12px 20px;
  border-radius: 16px;
  border: 3px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.nd-print {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 28px;
}
.nd-why {
  margin-top: 4px;
  font-size: 20px;
}
</style>
