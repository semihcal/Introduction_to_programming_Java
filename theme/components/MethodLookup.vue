<script setup lang="ts">
// A Car object drawn with its Vehicle part inside. Choose a method call and
// see where Java finds the method: in Car first, then in Vehicle.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const calls = [
  { code: 'car.getModel()', where: 'Car', method: 'getModel()', out: 'Returns "Camry"' },
  { code: 'car.startEngine()', where: 'Car', method: 'startEngine()', out: 'Prints Vrooooom!' },
  { code: 'car.travel("New York City")', where: 'Vehicle', method: 'travel()', out: 'Prints Traveling to New York City' },
  { code: 'car.fly()', where: 'none', method: 'fly()', out: 'Compile error: no such method' },
]

const s = useSyncedState('lookup', { pick: 0 })
const call = computed(() => calls[s.pick])
const steps = computed(() => {
  if (call.value.where === 'Car')
    return `Look in Car: ${call.value.method} is there. Use it.`
  if (call.value.where === 'Vehicle')
    return `Look in Car: not there. Look deeper, in Vehicle: ${call.value.method} is there. Use it.`
  return `Look in Car: not there. Look in Vehicle: not there either.`
})
</script>

<template>
  <div class="ml" @keydown.stop>
    <div class="ml-calls" role="group" aria-label="Choose a method call">
      <button
        v-for="(c, i) in calls"
        :key="c.code"
        type="button"
        :class="{ on: s.pick === i }"
        :aria-pressed="s.pick === i"
        @click="s.pick = i"
      >
        {{ c.code }}
      </button>
    </div>

    <div class="ml-main">
      <div class="ml-car" role="img" :aria-label="`A Car object containing model, getModel and startEngine, with a Vehicle part inside it containing travel. ${steps}`">
        <div class="ml-title">
          Car
        </div>
        <div class="ml-item">
          model
        </div>
        <div class="ml-item" :class="{ hit: call.method === 'getModel()' }">
          getModel()
        </div>
        <div class="ml-item" :class="{ hit: call.method === 'startEngine()' }">
          startEngine()
        </div>
        <div class="ml-vehicle">
          <div class="ml-title">
            Vehicle
          </div>
          <div class="ml-item" :class="{ hit: call.method === 'travel()' }">
            travel()
          </div>
        </div>
      </div>

      <div class="ml-result" aria-live="polite">
        <div class="ml-steps">
          {{ steps }}
        </div>
        <div class="ml-out" :class="{ bad: call.where === 'none' }">
          {{ call.out }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ml {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.ml-calls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ml-calls button {
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
.ml-calls button.on {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.ml-main {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 28px;
  align-items: center;
}
.ml-car {
  padding: 10px 14px 14px;
  border-radius: 16px;
  border: 3px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.ml-vehicle {
  margin-top: 8px;
  padding: 8px 12px 10px;
  border-radius: 12px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
}
.ml-title {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}
.ml-item {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 19px;
  padding: 2px 10px;
  margin: 3px 0;
  border-radius: 8px;
  border: 3px solid transparent;
}
.ml-item.hit {
  border-color: var(--c-ink, #0f172a);
  background: #ffffff;
  font-weight: 700;
}
.ml-item.hit::after {
  content: '  ← found';
  font-family: var(--slidev-font-sans, sans-serif);
  font-size: 18px;
}
.ml-result {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 22px;
  line-height: 1.4;
}
.ml-out {
  padding: 10px 16px;
  border-radius: 12px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
}
.ml-out.bad {
  border: 3px dashed var(--c-accent-2, #c2410c);
}
</style>
