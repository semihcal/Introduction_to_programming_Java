<script setup lang="ts">
// The do-while menu: the menu prints before anything is checked. Pick an
// option; for 1 to 3 the two numbers a and b are used and the result is
// printed; the loop repeats until 4 (Quit). The console keeps the history.
import { useSyncedState } from '../composables/useSyncedState'

const MENU = '1. Add  2. Subtract  3. Multiply  4. Quit'
const s = useSyncedState('menudemo', { a: 7, b: 3, lines: [MENU] as string[], quit: false, passes: 1 })

function choose(c: number) {
  if (s.quit)
    return
  if (c === 4) {
    s.lines.push('> 4', 'choice != 4 is false: the loop ends.')
    s.quit = true
    return
  }
  const r = c === 1 ? s.a + s.b : c === 2 ? s.a - s.b : s.a * s.b
  s.lines.push(`> ${c}   a = ${s.a}, b = ${s.b}`, String(r), MENU)
  s.passes++
}
function reset() {
  s.lines = [MENU]; s.quit = false; s.passes = 1
}
function bump(k: 'a' | 'b', by: number) {
  s[k] = Math.max(-9, Math.min(9, s[k] + by))
}
</script>

<template>
  <div class="md" @keydown.stop>
    <div class="md-ctl">
      <span v-for="k in (['a', 'b'] as const)" :key="k" class="md-var">
        <code>{{ k }}</code>
        <button type="button" :aria-label="`Decrease ${k}`" @click="bump(k, -1)">−</button>
        <b>{{ s[k] }}</b>
        <button type="button" :aria-label="`Increase ${k}`" @click="bump(k, 1)">+</button>
      </span>
      <span class="md-opts" role="group" aria-label="Menu choice">
        <button v-for="(l, k) in ['1 Add', '2 Subtract', '3 Multiply', '4 Quit']" :key="l" type="button" :disabled="s.quit" @click="choose(k + 1)">{{ l }}</button>
        <button type="button" class="r" @click="reset">Reset</button>
      </span>
    </div>
    <div class="md-con" aria-live="polite">
      <div class="md-h">
        Console · loop body has run {{ s.passes }} time{{ s.passes === 1 ? '' : 's' }}
      </div>
      <div v-for="(l, k) in s.lines.slice(-9)" :key="k" :class="{ u: l.startsWith('>'), e: l.startsWith('choice') }">
        {{ l }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.md { display: flex; flex-direction: column; gap: 10px; }
.md-ctl { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; font-size: 20px; }
.md-var { display: flex; align-items: center; gap: 6px; }
.md-var button { width: 32px; font-size: 20px; border-radius: 8px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); cursor: pointer; }
.md-var b { font-family: var(--slidev-font-mono, monospace); min-width: 28px; text-align: center; }
.md-opts { display: flex; gap: 6px; flex-wrap: wrap; }
.md-opts button { font: inherit; font-size: 18px; padding: 3px 12px; border-radius: 999px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-accent, #3730a3); color: #fff; cursor: pointer; }
.md-opts button.r { background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); }
.md-opts button:disabled { opacity: 0.4; cursor: default; }
.md-con { font-family: var(--slidev-font-mono, monospace); font-size: 18px; line-height: 1.4; padding: 8px 14px; border-radius: 12px; background: #0f172a; color: #e2e8f0; min-height: 230px; }
.md-h { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; }
.md-con .u { color: #fdba74; }
.md-con .e { color: #94a3b8; }
</style>
