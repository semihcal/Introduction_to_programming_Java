<script setup lang="ts">
// The else-if ladder for ordinals: index from 0 to 25. Conditions are
// checked top to bottom; the first true one runs and the rest are skipped.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('elseifdemo', { index: 2 })
const hit = computed(() => (s.index === 1 ? 0 : s.index === 2 ? 1 : s.index === 3 ? 2 : 3))
const out = computed(() => ['First', 'Second', 'Third', `${s.index}th`][hit.value])
const ROWS = [
  { test: 'if (index == 1)', body: 'System.out.println("First");', n: 1 },
  { test: 'else if (index == 2)', body: 'System.out.println("Second");', n: 2 },
  { test: 'else if (index == 3)', body: 'System.out.println("Third");', n: 3 },
  { test: 'else', body: 'System.out.println(index + "th");', n: 0 },
]
const state = (k: number) => (k < hit.value ? 'checked' : k === hit.value ? 'run' : 'skip')
</script>

<template>
  <div class="ei" @keydown.stop>
    <label class="ei-slider">
      <code>int index = {{ s.index }};</code>
      <input v-model.number="s.index" type="range" min="0" max="25" step="1" aria-label="Index">
    </label>
    <div class="ei-code">
      <template v-for="(r, k) in ROWS" :key="k">
        <div class="ei-test" :class="state(k)">
          {{ r.test }}
          <span v-if="r.n && state(k) !== 'skip'" class="ei-tag" :class="{ t: state(k) === 'run' }">{{ s.index }} == {{ r.n }} is {{ state(k) === 'run' }}</span>
          <span v-if="state(k) === 'skip'" class="ei-skip">not checked</span>
        </div>
        <div class="ei-body" :class="state(k)">
          &nbsp;&nbsp;&nbsp;&nbsp;{{ r.body }}
        </div>
      </template>
    </div>
    <div class="ei-out" aria-live="polite">
      Prints: <b>{{ out }}</b>
    </div>
  </div>
</template>

<style scoped>
.ei { display: flex; flex-direction: column; gap: 12px; }
.ei-slider { display: flex; align-items: center; gap: 16px; font-size: 20px; }
.ei-slider input { flex: 1; accent-color: var(--c-accent, #3730a3); }
.ei-code { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); }
.ei-test.skip, .ei-body.skip, .ei-body.checked { color: #94a3b8; }
.ei-body.checked, .ei-body.skip { text-decoration: line-through; }
.ei-body.run { font-weight: 700; background: var(--c-accent-2-soft, #fff7ed); border-radius: 4px; }
.ei-tag { font-size: 18px; margin-left: 8px; padding: 0 8px; border-radius: 6px; border: 2px dashed #b91c1c; }
.ei-tag.t { border: 2px solid #15803d; }
.ei-skip { font-family: var(--slidev-font-sans); font-size: 18px; margin-left: 8px; font-style: italic; }
.ei-out { font-size: 22px; }
.ei-out b { font-family: var(--slidev-font-mono, monospace); color: var(--c-accent-2, #c2410c); }
</style>
