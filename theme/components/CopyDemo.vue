<script setup lang="ts">
// Primitive assignment copies the value: x and y are independent boxes.
import { useSyncedState } from '../composables/useSyncedState'

const v = useSyncedState('copy', { x: 37, y: null as number | null })

function reset() {
  v.x = 37
  v.y = null
}
</script>

<template>
  <div class="demo" @keydown.stop>
    <div class="controls">
      <button type="button" :disabled="v.y !== null" @click="v.y = v.x">
        int y = x;
      </button>
      <button type="button" @click="v.x++">
        ++x;
      </button>
      <button type="button" :disabled="v.y === null" @click="v.y!--">
        --y;
      </button>
      <button type="button" class="ghost" @click="reset">
        Reset
      </button>
    </div>
    <div class="boxes" aria-live="polite">
      <div class="var">
        <div class="box">
          {{ v.x }}
        </div>
        <div class="label">
          x
        </div>
      </div>
      <div class="var">
        <div class="box" :class="{ empty: v.y === null }">
          {{ v.y === null ? '—' : v.y }}
        </div>
        <div class="label">
          {{ v.y === null ? 'y (not declared yet)' : 'y' }}
        </div>
      </div>
    </div>
    <div class="summary">
      Two boxes, two separate values. Changing one never changes the other.
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.controls {
  display: flex;
  gap: 10px;
}
.controls button {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 19px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 10px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  cursor: pointer;
}
.controls button.ghost {
  font-family: inherit;
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
}
.controls button:disabled {
  opacity: 0.4;
  cursor: default;
}
.boxes {
  display: flex;
  gap: 80px;
}
.var {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.box {
  width: 130px;
  height: 90px;
  display: grid;
  place-items: center;
  border: 3px solid var(--c-accent, #3730a3);
  border-radius: 12px;
  background: var(--c-accent-soft, #eef2ff);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 40px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.box.empty {
  border-style: dashed;
  border-color: var(--c-line, #94a3b8);
  background: transparent;
}
.label {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
}
.summary {
  font-size: 20px;
}
</style>
