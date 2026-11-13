<script setup lang="ts">
// Two references, one Ham object. Run the statements to see aliasing.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const ham = useSyncedState('ham', { hasHam2: false, bites: 0 })

function assign() {
  ham.hasHam2 = true
}
function bite() {
  ham.bites++
}
function reset() {
  ham.hasHam2 = false
  ham.bites = 0
}

const summary = computed(() =>
  `Objects: 1. References: ${ham.hasHam2 ? 2 : 1}. Bites taken from the ham: ${ham.bites}.`)
</script>

<template>
  <div class="demo" @keydown.stop>
    <div class="controls">
      <button type="button" :disabled="ham.hasHam2" @click="assign">
        Ham ham2 = ham1;
      </button>
      <button type="button" @click="bite">
        ham1.bite();
      </button>
      <button type="button" :disabled="!ham.hasHam2" @click="bite">
        ham2.bite();
      </button>
      <button type="button" class="ghost" @click="reset">
        Reset
      </button>
    </div>

    <svg viewBox="0 0 640 230" class="stage" role="img" :aria-label="`Memory diagram. ${summary} Every reference arrow points at the same single Ham object.`">
      <defs>
        <marker id="ham-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" class="head" />
        </marker>
      </defs>

      <text x="90" y="24" class="cap">references</text>
      <text x="500" y="24" class="cap">object</text>

      <rect x="20" y="40" width="140" height="56" rx="10" class="ref" />
      <text x="90" y="76" class="name">ham1</text>
      <line x1="160" y1="68" x2="396" y2="110" class="arrow" marker-end="url(#ham-arrow)" />

      <g v-if="ham.hasHam2">
        <rect x="20" y="150" width="140" height="56" rx="10" class="ref" />
        <text x="90" y="186" class="name">ham2</text>
        <line x1="160" y1="178" x2="396" y2="140" class="arrow" marker-end="url(#ham-arrow)" />
      </g>
      <g v-else>
        <rect x="20" y="150" width="140" height="56" rx="10" class="ref empty" />
        <text x="90" y="184" class="hint">no ham2 yet</text>
      </g>

      <rect x="400" y="50" width="200" height="150" rx="16" class="obj" />
      <text x="500" y="112" class="emoji" aria-hidden="true">🍖</text>
      <text x="500" y="150" class="name">Ham object</text>
      <text x="500" y="180" class="bites">bites taken: {{ ham.bites }}</text>
    </svg>

    <div class="summary" aria-live="polite">
      {{ summary }}
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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
.stage {
  width: 640px;
  height: 230px;
}
.cap {
  text-anchor: middle;
  font-size: 18px;
  fill: var(--c-muted, #475569);
}
.ref {
  fill: var(--c-accent-soft, #eef2ff);
  stroke: var(--c-accent, #3730a3);
  stroke-width: 3;
}
.ref.empty {
  fill: none;
  stroke: var(--c-line, #94a3b8);
  stroke-dasharray: 6 6;
}
.obj {
  fill: var(--c-accent-2-soft, #fff7ed);
  stroke: var(--c-accent-2, #c2410c);
  stroke-width: 3;
}
.name {
  text-anchor: middle;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
  fill: var(--c-ink, #0f172a);
}
.hint {
  text-anchor: middle;
  font-size: 18px;
  fill: var(--c-muted, #475569);
}
.bites {
  text-anchor: middle;
  font-size: 20px;
  fill: var(--c-ink, #0f172a);
}
.emoji {
  text-anchor: middle;
  font-size: 48px;
}
.arrow {
  stroke: var(--c-accent, #3730a3);
  stroke-width: 4;
}
.head {
  fill: var(--c-accent, #3730a3);
}
.summary {
  font-size: 20px;
  font-weight: 600;
}
</style>
