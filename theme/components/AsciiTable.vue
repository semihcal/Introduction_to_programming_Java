<script setup lang="ts">
// The printable ASCII characters (codes 32 to 126) in a grid. Clicking one
// selects it and shows its code in decimal and binary; ++ and -- step the
// selected char like `letter++`. For a lowercase letter it also shows
// `letter - 'a' + 1`, the letter's position in the alphabet.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ start?: string }>(), { start: 'x' })
const s = useSyncedState(`ascii-${props.start}`, { code: props.start.charCodeAt(0) })

const codes = Array.from({ length: 95 }, (_, i) => i + 32)
const show = (c: number) => (c === 32 ? 'sp' : String.fromCharCode(c))
const lit = computed(() => {
  if (s.code === 32)
    return '\' \''
  if (s.code === 39)
    return '\'\\\'\''
  if (s.code === 92)
    return '\'\\\\\''
  return `'${String.fromCharCode(s.code)}'`
})
const bin = computed(() => s.code.toString(2).padStart(7, '0'))
const lower = computed(() => s.code >= 97 && s.code <= 122)
function step(by: number) {
  s.code = Math.max(32, Math.min(126, s.code + by))
}
</script>

<template>
  <div class="at" @keydown.stop>
    <div class="at-grid" role="group" aria-label="Printable ASCII characters">
      <button
        v-for="c in codes" :key="c" type="button" class="at-cell"
        :class="{ on: c === s.code }" :aria-label="`${show(c)}, code ${c}`" @click="s.code = c"
      >
        <span class="at-ch">{{ show(c) }}</span>
        <span class="at-n">{{ c }}</span>
      </button>
    </div>
    <div class="at-info" aria-live="polite">
      <span class="at-big">{{ lit }}</span>
      <span>code <b>{{ s.code }}</b></span>
      <span>binary <b>{{ bin }}</b></span>
      <span v-if="lower"><code>{{ lit }} - 'a' + 1</code> = <b>{{ s.code - 96 }}</b></span>
      <span class="at-btns">
        <button type="button" aria-label="Decrement the char" @click="step(-1)">letter--</button>
        <button type="button" aria-label="Increment the char" @click="step(1)">letter++</button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.at {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.at-grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 3px;
}
.at-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border: 1px solid var(--c-line, #94a3b8);
  border-radius: 6px;
  background: var(--c-paper, #fff);
  cursor: pointer;
  font: inherit;
  line-height: 1.05;
}
.at-cell.on {
  border: 2px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.at-ch {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  font-weight: 700;
  color: var(--c-ink, #0f172a);
}
.at-n {
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.at-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  font-size: 20px;
  padding: 2px 12px;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 10px;
}
.at-info b {
  font-family: var(--slidev-font-mono, monospace);
  color: var(--c-accent, #3730a3);
}
.at-big {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 30px;
  font-weight: 700;
  color: var(--c-accent-2, #c2410c);
}
.at-btns {
  display: flex;
  gap: 8px;
  margin-left: auto;
}
.at-btns button {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  padding: 3px 12px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
</style>
