<script setup lang="ts">
// The conditional operator: int max = (a > b) ? a : b; next to the
// equivalent if-else. Steppers set a and b; the chosen side is highlighted.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('ternarydemo', { a: 3, b: 8 })
const cond = computed(() => s.a > s.b)
const max = computed(() => (cond.value ? s.a : s.b))
function bump(k: 'a' | 'b', by: number) {
  s[k] = Math.max(-9, Math.min(9, s[k] + by))
}
</script>

<template>
  <div class="tn" @keydown.stop>
    <div class="tn-vars">
      <span v-for="k in (['a', 'b'] as const)" :key="k" class="tn-var">
        <code>int {{ k }} =</code>
        <button type="button" :aria-label="`Decrease ${k}`" @click="bump(k, -1)">−</button>
        <b>{{ s[k] }}</b>
        <button type="button" :aria-label="`Increase ${k}`" @click="bump(k, 1)">+</button>
      </span>
    </div>
    <div class="tn-expr">
      int max = (<span class="tn-c">a &gt; b</span>) ? <span class="tn-o" :class="{ on: cond }">a</span> : <span class="tn-o" :class="{ on: !cond }">b</span>;
    </div>
    <p class="tn-why" aria-live="polite">
      {{ s.a }} &gt; {{ s.b }} is <b>{{ cond }}</b>, so the {{ cond ? 'first' : 'second' }} value is chosen: max is <b>{{ max }}</b>.
    </p>
    <div class="tn-same">
      <div class="tn-h">
        Same as
      </div>
      <div>int max;</div>
      <div>if (a &gt; b) { <span :class="{ on: cond }">max = a;</span> }</div>
      <div>else { <span :class="{ on: !cond }">max = b;</span> }</div>
    </div>
  </div>
</template>

<style scoped>
.tn { display: flex; flex-direction: column; gap: 12px; }
.tn-vars { display: flex; gap: 28px; font-size: 22px; }
.tn-var { display: flex; align-items: center; gap: 8px; }
.tn-var button { width: 36px; font-size: 20px; border-radius: 8px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); cursor: pointer; }
.tn-var b { font-family: var(--slidev-font-mono, monospace); min-width: 30px; text-align: center; }
.tn-expr { font-family: var(--slidev-font-mono, monospace); font-size: 30px; font-weight: 700; }
.tn-c { color: var(--c-accent, #3730a3); }
.tn-o { padding: 0 8px; border-radius: 8px; border: 3px dashed var(--c-line, #94a3b8); color: var(--c-muted, #475569); }
.tn-o.on { border: 3px solid var(--c-accent-2, #c2410c); background: var(--c-accent-2-soft, #fff7ed); color: var(--c-ink, #0f172a); }
.tn-why { margin: 0; font-size: 20px; }
.tn-same { font-family: var(--slidev-font-mono, monospace); font-size: 19px; line-height: 1.6; padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); }
.tn-same .on { font-weight: 700; background: var(--c-accent-2-soft, #fff7ed); border-radius: 4px; }
.tn-h { font-family: var(--slidev-font-sans); font-size: 18px; color: var(--c-muted, #475569); }
</style>
