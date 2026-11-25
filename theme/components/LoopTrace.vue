<script setup lang="ts">
// Steps through: int i = 1; while (i <= n) { System.out.println(i); ++i; }
// one line at a time. Shows the current line, the value of i, the
// condition's value when it is checked, and the console.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ n?: number }>(), { n: 4 })

// Lines: 0 int i = 1;  1 while (i <= n) {  2 println(i);  3 ++i;  4 }  5 after
const s = useSyncedState(`looptrace-${props.n}`, { line: -1, i: 0, out: [] as number[], checks: 0 })

const done = computed(() => s.line === 5)
const cond = computed(() => s.i <= props.n)

function step() {
  if (s.line === -1) { s.line = 0; s.i = 1; return }
  if (s.line === 0 || s.line === 4) { s.line = 1; s.checks++; return }
  if (s.line === 1) { s.line = cond.value ? 2 : 5; return }
  if (s.line === 2) { s.out.push(s.i); s.line = 3; return }
  if (s.line === 3) { s.i++; s.line = 4 }
}
function reset() {
  s.line = -1; s.i = 0; s.out = []; s.checks = 0
}
const msg = computed(() => {
  switch (s.line) {
    case -1: return 'Press Step to start.'
    case 0: return 'i is created and set to 1.'
    case 1: return `Check the condition: ${s.i} <= ${props.n} is ${cond.value}.${cond.value ? ' Run the body.' : ' Leave the loop.'}`
    case 2: return `Print ${s.i}.`
    case 3: return `Add 1 to i.`
    case 4: return 'End of the body: jump back to the top.'
    default: return `Done. The condition was checked ${s.checks} times; the body ran ${s.out.length} times.`
  }
})
</script>

<template>
  <div class="lt" @keydown.stop>
    <div class="lt-cols">
      <div class="lt-code">
        <div :class="{ cur: s.line === 0 }">int i = 1;</div>
        <div :class="{ cur: s.line === 1 }">while (i &lt;= {{ n }}) {</div>
        <div :class="{ cur: s.line === 2 }">&nbsp;&nbsp;System.out.println(i);</div>
        <div :class="{ cur: s.line === 3 }">&nbsp;&nbsp;++i;</div>
        <div :class="{ cur: s.line === 4 }">}</div>
        <div :class="{ cur: s.line === 5 }">// after the loop</div>
      </div>
      <div class="lt-side">
        <div class="lt-var">
          <span>i</span><b>{{ s.line >= 0 ? s.i : '' }}</b>
        </div>
        <div class="lt-con">
          <div class="lt-h">
            Console
          </div>
          <div v-for="(v, k) in s.out" :key="k">
            {{ v }}
          </div>
        </div>
      </div>
    </div>
    <div class="lt-bar">
      <button type="button" :disabled="done" @click="step">
        Step
      </button>
      <button type="button" @click="reset">
        Reset
      </button>
      <span class="lt-msg" aria-live="polite">{{ msg }}</span>
    </div>
  </div>
</template>

<style scoped>
.lt { display: flex; flex-direction: column; gap: 12px; }
.lt-cols { display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; }
.lt-code { font-family: var(--slidev-font-mono, monospace); font-size: 22px; line-height: 1.7; padding: 10px 16px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); }
.lt-code > div { border-left: 4px solid transparent; padding-left: 8px; }
.lt-code .cur { border-left-color: var(--c-accent-2, #c2410c); background: var(--c-accent-2-soft, #fff7ed); font-weight: 700; }
.lt-side { display: flex; flex-direction: column; gap: 10px; }
.lt-var { display: flex; align-items: center; gap: 12px; font-family: var(--slidev-font-mono, monospace); font-size: 22px; font-weight: 700; }
.lt-var b { min-width: 80px; min-height: 48px; display: grid; place-items: center; border: 3px solid var(--c-accent, #3730a3); border-radius: 10px; background: var(--c-accent-soft, #eef2ff); font-size: 26px; }
.lt-con { flex: 1; font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.35; padding: 8px 14px; border-radius: 12px; background: #0f172a; color: #e2e8f0; min-height: 120px; }
.lt-h { font-size: 18px; color: #94a3b8; }
.lt-bar { display: flex; align-items: center; gap: 10px; }
.lt-bar button { font: inherit; font-size: 18px; padding: 3px 16px; border-radius: 999px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); cursor: pointer; }
.lt-bar button:first-child { background: var(--c-accent, #3730a3); color: #fff; }
.lt-bar button:disabled { opacity: 0.4; cursor: default; }
.lt-msg { font-size: 20px; }
</style>
