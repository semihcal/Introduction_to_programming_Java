<script setup lang="ts">
// Java arithmetic on two numbers: choose int or double, the values of a and
// b, and an operator. Shows the result Java gives and why, including integer
// division dropping the fraction, the remainder from %, the sign rules for
// negative numbers, and division by zero.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ a?: number, b?: number, op?: string, type?: 'int' | 'double' }>(), {
  a: 7,
  b: 2,
  op: '/',
  type: 'int',
})

const OPS = ['+', '-', '*', '/', '%']
const s = useSyncedState(`opcalc-${props.a}-${props.b}-${props.op}-${props.type}`, {
  type: props.type as 'int' | 'double',
  a: props.a,
  b: props.b,
  op: props.op,
})

// How Java prints a double: whole numbers keep ".0".
function jd(x: number) {
  if (Number.isNaN(x))
    return 'NaN'
  if (!Number.isFinite(x))
    return x > 0 ? 'Infinity' : '-Infinity'
  const t = String(x)
  return /[.e]/.test(t) ? t : `${t}.0`
}
const lit = (n: number) => (s.type === 'int' ? String(n) : jd(n))

const result = computed(() => {
  const { a, b, op } = s
  if (s.type === 'int') {
    if ((op === '/' || op === '%') && b === 0)
      return { text: 'ArithmeticException', why: 'An int cannot be divided by zero: the program crashes with "/ by zero".' }
    if (op === '+')
      return { text: String(a + b), why: `${a} plus ${b}.` }
    if (op === '-')
      return { text: String(a - b), why: `${a} minus ${b}.` }
    if (op === '*')
      return { text: String(a * b), why: `${a} times ${b}.` }
    if (op === '/') {
      const q = Math.trunc(a / b)
      if (a % b === 0)
        return { text: String(q), why: `${b} goes into ${a} exactly ${q} times.` }
      return { text: String(q), why: `In math ${a} ÷ ${b} is ${jd(a / b).replace(/\.0$/, '')}. Integer division drops the fraction (no rounding), leaving ${q}.` }
    }
    const r = a % b
    const q = Math.trunc(a / b)
    let why = `${a} = ${q} × ${b} ${r < 0 ? '−' : '+'} ${Math.abs(r)}, so the remainder is ${r}.`
    if (b === 2)
      why += r === 0 ? ` ${a} % 2 is 0, so ${a} is even.` : ` ${a} % 2 is not 0, so ${a} is odd.`
    else if (a < 0)
      why += ' The remainder takes the sign of the left number.'
    return { text: String(r), why }
  }
  let v: number
  if (op === '+')
    v = a + b
  else if (op === '-')
    v = a - b
  else if (op === '*')
    v = a * b
  else if (op === '/')
    v = a / b
  else v = a % b
  let why = 'double arithmetic keeps the fractional part.'
  if (op === '/' && b === 0)
    why = a === 0 ? '0.0 / 0.0 is "not a number". A double division by zero does not crash.' : `A double divided by zero gives ${a > 0 ? 'Infinity' : '-Infinity'}. It does not crash, unlike an int.`
  else if (op === '%' && b === 0)
    why = 'A double % 0.0 gives NaN, "not a number".'
  else if (op === '%')
    why = '% works on doubles too, but it is rarely used.'
  return { text: jd(v), why }
})

function bump(k: 'a' | 'b', by: number) {
  s[k] = Math.max(-20, Math.min(20, s[k] + by))
}
</script>

<template>
  <div class="oc" @keydown.stop>
    <div class="oc-row">
      <div class="oc-group" role="group" aria-label="Type">
        <button
          v-for="t in ['int', 'double']" :key="t" type="button" class="oc-pill"
          :class="{ on: s.type === t }" :aria-pressed="s.type === t" @click="s.type = t as 'int' | 'double'"
        >
          {{ t }}
        </button>
      </div>
      <div class="oc-group" role="group" aria-label="Operator">
        <button
          v-for="o in OPS" :key="o" type="button" class="oc-op"
          :class="{ on: s.op === o }" :aria-pressed="s.op === o" :aria-label="`Operator ${o}`" @click="s.op = o"
        >
          {{ o }}
        </button>
      </div>
    </div>

    <div class="oc-expr">
      <div class="oc-num">
        <button type="button" :aria-label="'Increase a'" @click="bump('a', 1)">▲</button>
        <span class="oc-val">{{ lit(s.a) }}</span>
        <button type="button" :aria-label="'Decrease a'" @click="bump('a', -1)">▼</button>
        <span class="oc-name">a</span>
      </div>
      <span class="oc-sym">{{ s.op }}</span>
      <div class="oc-num">
        <button type="button" :aria-label="'Increase b'" @click="bump('b', 1)">▲</button>
        <span class="oc-val">{{ lit(s.b) }}</span>
        <button type="button" :aria-label="'Decrease b'" @click="bump('b', -1)">▼</button>
        <span class="oc-name">b</span>
      </div>
      <span class="oc-sym">→</span>
      <span class="oc-res" :class="{ err: result.text === 'ArithmeticException' }">{{ result.text }}</span>
    </div>

    <div class="oc-why" aria-live="polite">
      <code>{{ s.type }} a = {{ lit(s.a) }}, b = {{ lit(s.b) }};</code> &nbsp; <code>a {{ s.op }} b</code> <template v-if="result.text === 'ArithmeticException'">throws an <b>ArithmeticException</b>.</template><template v-else>is <b>{{ result.text }}</b>.</template> {{ result.why }}
    </div>
  </div>
</template>

<style scoped>
.oc {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.oc-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.oc-group {
  display: flex;
  gap: 6px;
}
.oc-pill,
.oc-op {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
  padding: 3px 14px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.oc-op {
  min-width: 48px;
  border-radius: 10px;
}
.oc-pill.on,
.oc-op.on {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.oc-expr {
  display: flex;
  align-items: center;
  gap: 18px;
}
.oc-num {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.oc-num button {
  border: 0;
  background: none;
  font-size: 18px;
  color: var(--c-accent, #3730a3);
  cursor: pointer;
  width: 44px;
}
.oc-val {
  min-width: 110px;
  text-align: center;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 36px;
  font-weight: 700;
  padding: 4px 10px;
  border: 3px solid var(--c-accent, #3730a3);
  border-radius: 12px;
  background: var(--c-accent-soft, #eef2ff);
}
.oc-name {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.oc-sym {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 40px;
  font-weight: 700;
}
.oc-res {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 40px;
  font-weight: 700;
  padding: 4px 16px;
  border: 3px solid var(--c-accent-2, #c2410c);
  border-radius: 12px;
  background: var(--c-accent-2-soft, #fff7ed);
}
.oc-res.err {
  font-size: 24px;
  border-style: dashed;
}
.oc-why {
  font-size: 20px;
  line-height: 1.5;
  min-height: 92px;
  padding: 8px 14px;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 10px;
}
.oc-why code {
  font-size: 18px;
}
</style>
