<script setup lang="ts">
// Steps through for (int i = 1; i <= n; ++i) { System.out.println(i); }
// showing the order the three header parts run in: initialization once,
// then condition, body, increment, condition, body, increment, ...
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ n?: number }>(), { n: 3 })
// part: 'start' | 'init' | 'cond' | 'body' | 'inc' | 'done'
const s = useSyncedState(`fortrace-${props.n}`, { part: 'start', i: 0, out: [] as number[], order: [] as string[] })
const cond = computed(() => s.i <= props.n)

function step() {
  switch (s.part) {
    case 'start': s.part = 'init'; s.i = 1; s.order.push('init'); break
    case 'init': case 'inc': s.part = 'cond'; s.order.push('cond'); break
    case 'cond': if (cond.value) { s.part = 'body'; s.out.push(s.i); s.order.push('body') } else { s.part = 'done' } break
    case 'body': s.part = 'inc'; s.i++; s.order.push('inc'); break
  }
}
function reset() { s.part = 'start'; s.i = 0; s.out = []; s.order = [] }
const msg = computed(() => ({
  start: 'Press Step to start.',
  init: 'Initialization runs once: i = 1.',
  cond: `Condition: ${s.i} <= ${props.n} is ${cond.value}.${cond.value ? '' : ' The loop ends.'}`,
  body: `Body: print ${s.i}.`,
  inc: `Increment: ++i makes i ${s.i}. Back to the condition.`,
  done: `Done: the body ran ${s.out.length} times, the condition was checked ${s.order.filter(o => o === 'cond').length} times.`,
} as Record<string, string>)[s.part])
</script>

<template>
  <div class="ft" @keydown.stop>
    <div class="ft-code">
      <div>
        for (<span :class="{ cur: s.part === 'init' }">int i = 1</span>; <span :class="{ cur: s.part === 'cond' }">i &lt;= {{ n }}</span>; <span :class="{ cur: s.part === 'inc' }">++i</span>) {
      </div>
      <div :class="{ cur: s.part === 'body' }" class="ft-body">
        &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(i);
      </div>
      <div>}</div>
    </div>
    <div class="ft-row">
      <div class="ft-var">
        <span>i</span><b>{{ s.part === 'start' ? '' : s.i }}</b>
      </div>
      <div class="ft-order">
        <span v-for="(o, k) in s.order" :key="k" :class="o">{{ o }}</span>
      </div>
      <div class="ft-con">
        <span class="ft-h">Console</span> {{ s.out.join(' ') }}
      </div>
    </div>
    <div class="ft-bar">
      <button type="button" :disabled="s.part === 'done'" @click="step">
        Step
      </button>
      <button type="button" class="r" @click="reset">
        Reset
      </button>
      <span aria-live="polite">{{ msg }}</span>
    </div>
  </div>
</template>

<style scoped>
.ft { display: flex; flex-direction: column; gap: 14px; }
.ft-code { font-family: var(--slidev-font-mono, monospace); font-size: 26px; line-height: 1.7; padding: 10px 18px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); }
.ft-code span, .ft-body { padding: 1px 4px; border-radius: 6px; }
.ft-code .cur { background: var(--c-accent-2-soft, #fff7ed); outline: 3px solid var(--c-accent-2, #c2410c); font-weight: 700; }
.ft-row { display: grid; grid-template-columns: auto 1fr 1fr; gap: 14px; align-items: center; }
.ft-var { display: flex; align-items: center; gap: 10px; font-family: var(--slidev-font-mono, monospace); font-size: 22px; font-weight: 700; }
.ft-var b { min-width: 64px; min-height: 46px; display: grid; place-items: center; border: 3px solid var(--c-accent, #3730a3); border-radius: 10px; background: var(--c-accent-soft, #eef2ff); }
.ft-order { display: flex; flex-wrap: wrap; gap: 4px; font-family: var(--slidev-font-mono, monospace); font-size: 18px; }
.ft-order span { padding: 0 6px; border-radius: 6px; border: 2px solid var(--c-line, #94a3b8); }
.ft-order .init { border-color: #15803d; }
.ft-order .cond { border-color: var(--c-accent, #3730a3); }
.ft-order .body { border-color: var(--c-accent-2, #c2410c); }
.ft-con { font-family: var(--slidev-font-mono, monospace); font-size: 20px; padding: 8px 12px; border-radius: 10px; background: #0f172a; color: #e2e8f0; }
.ft-h { font-size: 18px; color: #94a3b8; margin-right: 8px; }
.ft-bar { display: flex; align-items: center; gap: 10px; font-size: 20px; }
.ft-bar button { font: inherit; font-size: 18px; padding: 3px 16px; border-radius: 999px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-accent, #3730a3); color: #fff; cursor: pointer; }
.ft-bar button.r { background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); }
.ft-bar button:disabled { opacity: 0.4; cursor: default; }
</style>
