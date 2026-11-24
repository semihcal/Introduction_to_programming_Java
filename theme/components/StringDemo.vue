<script setup lang="ts">
// A String drawn as numbered boxes (zero-based). Three modes: length(),
// charAt(i) with i from -1 to length + 1 (out of range throws), and
// substring(start, end) with the chosen range highlighted.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const WORDS = ['walnut', 'disco fever', 'a mile long']
const s = useSyncedState('stringdemo', { w: 1, mode: 'substring', i: 3, a: 3, b: 7 })

const word = computed(() => WORDS[s.w])
const n = computed(() => word.value.length)
const chars = computed(() => word.value.split(''))

function setWord(k: number) {
  s.w = k
  s.i = Math.min(s.i, WORDS[k].length - 1)
  s.a = Math.min(s.a, WORDS[k].length)
  s.b = Math.min(Math.max(s.b, s.a), WORDS[k].length)
}
function bump(k: 'i' | 'a' | 'b', by: number) {
  if (k === 'i')
    s.i = Math.max(-1, Math.min(n.value + 1, s.i + by))
  else if (k === 'a')
    s.a = Math.max(0, Math.min(s.b, s.a + by))
  else s.b = Math.max(s.a, Math.min(n.value, s.b + by))
}

const call = computed(() => {
  const v = `"${word.value}"`
  if (s.mode === 'length')
    return { code: `${v}.length()`, out: String(n.value), err: false }
  if (s.mode === 'charAt') {
    if (s.i < 0 || s.i >= n.value)
      return { code: `${v}.charAt(${s.i})`, out: `StringIndexOutOfBoundsException (crash): the last index is ${n.value - 1}`, err: true }
    return { code: `${v}.charAt(${s.i})`, out: `'${word.value[s.i]}'`, err: false }
  }
  return { code: `${v}.substring(${s.a}, ${s.b})`, out: `"${word.value.slice(s.a, s.b)}"`, err: false }
})
const lit = (k: number) => s.mode === 'length' || (s.mode === 'charAt' && k === s.i) || (s.mode === 'substring' && k >= s.a && k < s.b)
</script>

<template>
  <div class="sd" @keydown.stop>
    <div class="sd-row">
      <div class="sd-group" role="group" aria-label="Word">
        <button
          v-for="(w, k) in WORDS" :key="w" type="button" class="sd-pill"
          :class="{ on: s.w === k }" :aria-pressed="s.w === k" @click="setWord(k)"
        >
          "{{ w }}"
        </button>
      </div>
      <div class="sd-group" role="group" aria-label="Method">
        <button
          v-for="m in ['length', 'charAt', 'substring']" :key="m" type="button" class="sd-pill m"
          :class="{ on: s.mode === m }" :aria-pressed="s.mode === m" @click="s.mode = m"
        >
          {{ m }}()
        </button>
      </div>
    </div>

    <div class="sd-boxes">
      <div v-for="(c, k) in chars" :key="k" class="sd-cell" :class="{ on: lit(k) }">
        <span class="sd-ch">{{ c === ' ' ? '␣' : c }}</span>
        <span class="sd-i">{{ k }}</span>
      </div>
      <div v-if="s.mode === 'substring'" class="sd-end" :style="{ left: `${s.b * 58}px` }" aria-hidden="true">
        stop
      </div>
    </div>

    <div class="sd-ctl">
      <template v-if="s.mode === 'charAt'">
        <span>i</span>
        <button type="button" aria-label="Decrease i" @click="bump('i', -1)">−</button>
        <b>{{ s.i }}</b>
        <button type="button" aria-label="Increase i" @click="bump('i', 1)">+</button>
      </template>
      <template v-if="s.mode === 'substring'">
        <span>start</span>
        <button type="button" aria-label="Decrease start" @click="bump('a', -1)">−</button>
        <b>{{ s.a }}</b>
        <button type="button" aria-label="Increase start" @click="bump('a', 1)">+</button>
        <span style="margin-left: 18px">end</span>
        <button type="button" aria-label="Decrease end" @click="bump('b', -1)">−</button>
        <b>{{ s.b }}</b>
        <button type="button" aria-label="Increase end" @click="bump('b', 1)">+</button>
      </template>
    </div>

    <div class="sd-out" :class="{ err: call.err }" aria-live="polite">
      <code>{{ call.code }}</code> → <b>{{ call.out }}</b>
    </div>
  </div>
</template>

<style scoped>
.sd {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sd-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
.sd-group {
  display: flex;
  gap: 6px;
}
.sd-pill {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  padding: 3px 12px;
  border-radius: 999px;
  border: 2px solid var(--c-accent-2, #c2410c);
  background: var(--c-paper, #fff);
  color: var(--c-accent-2, #c2410c);
  cursor: pointer;
}
.sd-pill.m {
  border-color: var(--c-accent, #3730a3);
  color: var(--c-accent, #3730a3);
}
.sd-pill.on {
  background: var(--c-accent-2, #c2410c);
  color: #fff;
}
.sd-pill.m.on {
  background: var(--c-accent, #3730a3);
}
.sd-boxes {
  position: relative;
  display: flex;
  gap: 4px;
  padding-top: 24px;
}
.sd-cell {
  width: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.sd-ch {
  width: 54px;
  height: 58px;
  display: grid;
  place-items: center;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 30px;
  font-weight: 700;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 8px;
  background: var(--c-paper, #fff);
}
.sd-cell.on .sd-ch {
  border: 3px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.sd-i {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.sd-end {
  position: absolute;
  top: 0;
  bottom: 26px;
  margin-left: -4px;
  border-left: 3px dashed var(--c-accent, #3730a3);
  padding-left: 4px;
  font-size: 18px;
  font-weight: 700;
  color: var(--c-accent, #3730a3);
  line-height: 1;
}
.sd-ctl {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  min-height: 34px;
}
.sd-ctl button {
  width: 36px;
  font-size: 20px;
  border-radius: 8px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.sd-ctl b {
  font-family: var(--slidev-font-mono, monospace);
  min-width: 30px;
  text-align: center;
}
.sd-out {
  font-size: 22px;
  padding: 8px 14px;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 10px;
}
.sd-out.err {
  border: 2px dashed #b91c1c;
  font-size: 20px;
}
.sd-out b {
  font-family: var(--slidev-font-mono, monospace);
}
</style>
