<script setup lang="ts">
// Five variables, one of each basic type. Pick a literal, then pick a box:
// the demo says whether `name = literal;` compiles and what the box holds.
// Follows real Java rules, including the two surprising ones: an int literal
// fits in a double (widened to 5.0) and a char fits in an int or a double
// (stored as its character code).
import { useSyncedState } from '../composables/useSyncedState'

interface Lit { code: string, type: string, num?: number }
const LITS: Lit[] = [
  { code: '-5', type: 'int' },
  { code: '900031', type: 'int' },
  { code: '3.14', type: 'double' },
  { code: '6.02e23', type: 'double' },
  { code: 'true', type: 'boolean' },
  { code: 'false', type: 'boolean' },
  { code: '\'A\'', type: 'char', num: 65 },
  { code: '\'&\'', type: 'char', num: 38 },
  { code: '"Mad flavor"', type: 'String' },
  { code: '"10"', type: 'String' },
]
const BOXES = [
  { type: 'int', name: 'i' },
  { type: 'double', name: 'x' },
  { type: 'boolean', name: 'value' },
  { type: 'char', name: 'c' },
  { type: 'String', name: 'word' },
]

// "an int", "a double", ...
const an = (t: string) => (t === 'int' ? 'an ' : 'a ') + t

const s = useSyncedState('typeboxes', {
  lit: null as number | null,
  held: BOXES.map(() => '') as string[],
  msg: 'Pick a value, then pick the box to put it in.',
  ok: null as boolean | null,
})

function pickLit(i: number) {
  s.lit = i
  s.ok = null
  s.msg = `${LITS[i].code} is ${an(LITS[i].type)} literal. Now pick a box.`
}

function place(b: number) {
  if (s.lit === null) {
    s.ok = null
    s.msg = 'Pick a value first.'
    return
  }
  const lit = LITS[s.lit]
  const box = BOXES[b]
  const stmt = `${box.name} = ${lit.code};`
  let stored: string | null = null
  let why = ''
  if (lit.type === box.type) {
    stored = lit.code
    why = `${lit.code} is ${an(box.type)} literal.`
  }
  else if (lit.type === 'int' && box.type === 'double') {
    stored = `${lit.code}.0`
    why = `Java widens the int to a double, so ${box.name} holds ${stored}.`
  }
  else if (lit.type === 'char' && (box.type === 'int' || box.type === 'double')) {
    stored = box.type === 'int' ? String(lit.num) : `${lit.num}.0`
    why = `a char is stored as a number, so ${box.name} holds ${stored}, the code for ${lit.code}.`
  }
  else if (lit.type === 'double' && box.type === 'int') {
    why = `${lit.code} is a double; an int box has no room for a fraction or a huge value.`
  }
  else if (lit.type === 'String') {
    why = `${lit.code} is a String (text in double quotes), not ${an(box.type)}.`
  }
  else if (box.type === 'String') {
    why = `only text in double quotes is a String; ${lit.code} is ${an(lit.type)}.`
  }
  else if (box.type === 'boolean' || lit.type === 'boolean') {
    why = `only true and false go in a boolean box, and they go nowhere else.`
  }
  else {
    why = `${lit.code} is ${an(lit.type)}, and ${an(box.type)} box cannot hold it.`
  }
  if (stored !== null) {
    s.held[b] = stored
    s.ok = true
    s.msg = `✓ ${stmt} compiles: ${why}`
  }
  else {
    s.ok = false
    s.msg = `✗ ${stmt} is a compile error: ${why}`
  }
}

function reset() {
  s.lit = null
  s.held = BOXES.map(() => '')
  s.ok = null
  s.msg = 'Pick a value, then pick the box to put it in.'
}
</script>

<template>
  <div class="tb" @keydown.stop>
    <div class="tb-lits" role="group" aria-label="Values to assign">
      <button
        v-for="(l, i) in LITS" :key="i" type="button" class="tb-lit"
        :class="{ on: s.lit === i }" :aria-pressed="s.lit === i" @click="pickLit(i)"
      >
        {{ l.code }}
      </button>
    </div>
    <div class="tb-boxes" role="group" aria-label="Variables">
      <button
        v-for="(b, i) in BOXES" :key="i" type="button" class="tb-box"
        :class="{ obj: b.type === 'String' }" :aria-label="`Put the value in ${b.type} ${b.name}`" @click="place(i)"
      >
        <span class="tb-type">{{ b.type }}</span>
        <span class="tb-held" :class="{ empty: !s.held[i] }">{{ s.held[i] || 'empty' }}</span>
        <span class="tb-name">{{ b.name }}</span>
      </button>
    </div>
    <div class="tb-msg" :class="{ ok: s.ok === true, bad: s.ok === false }" aria-live="polite">
      {{ s.msg }}
    </div>
    <div>
      <button type="button" class="tb-reset" @click="reset">
        Reset
      </button>
    </div>
  </div>
</template>

<style scoped>
.tb {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.tb-lits {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tb-lit {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
  padding: 4px 12px;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 10px;
  background: var(--c-paper, #fff);
  color: var(--c-ink, #0f172a);
  cursor: pointer;
}
.tb-lit.on {
  border-color: var(--c-ink, #0f172a);
  background: var(--c-ink, #0f172a);
  color: var(--c-paper, #fff);
}
.tb-boxes {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.tb-box {
  --tb-c: var(--c-accent, #3730a3);
  --tb-soft: var(--c-accent-soft, #eef2ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border: 3px solid var(--tb-c);
  border-radius: 12px;
  background: var(--tb-soft);
  font: inherit;
  cursor: pointer;
}
.tb-box.obj {
  --tb-c: var(--c-accent-2, #c2410c);
  --tb-soft: var(--c-accent-2-soft, #fff7ed);
}
.tb-type {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  color: var(--tb-c);
}
.tb-held {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
  min-height: 30px;
  max-width: 100%;
  overflow-wrap: anywhere;
  color: var(--c-ink, #0f172a);
}
.tb-held.empty {
  font-family: inherit;
  font-weight: 400;
  font-style: italic;
  color: var(--c-muted, #475569);
}
.tb-name {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  color: var(--c-muted, #475569);
}
.tb-msg {
  font-size: 20px;
  min-height: 60px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 2px solid var(--c-line, #94a3b8);
}
.tb-msg.ok {
  border-color: #15803d;
}
.tb-msg.bad {
  border-color: #b91c1c;
  border-style: dashed;
}
.tb-reset {
  font: inherit;
  font-size: 18px;
  padding: 3px 14px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
</style>
