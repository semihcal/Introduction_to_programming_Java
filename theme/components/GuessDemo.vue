<script setup lang="ts">
// The guessing game: the computer guesses a number from 1 to 100 by always
// trying the midpoint of the remaining range. The person answers H (too
// high), L (too low) or F (found). The range shrinks to one side of the
// midpoint (mid - 1 or mid + 1, so it always gets smaller).
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('guessdemo', {
  min: 1, max: 100, log: [] as string[], found: false,
})
const mid = computed(() => Math.floor((s.min + s.max) / 2))
const impossible = computed(() => s.min > s.max)

function answer(a: 'H' | 'L' | 'F') {
  if (s.found || impossible.value)
    return
  const g = mid.value
  if (a === 'F') {
    s.log.push(`${g}: F, found in ${s.log.length + 1} guesses`)
    s.found = true
    return
  }
  s.log.push(`${g}: ${a}, range ${a === 'H' ? `${s.min} to ${g - 1}` : `${g + 1} to ${s.max}`}`)
  if (a === 'H')
    s.max = g - 1
  else
    s.min = g + 1
}
function reset() {
  s.min = 1; s.max = 100; s.log = []; s.found = false
}
</script>

<template>
  <div class="gd" @keydown.stop>
    <div class="gd-bar" role="img" :aria-label="`Remaining range ${s.min} to ${s.max}`">
      <div class="gd-range" :style="{ left: `${(s.min - 1)}%`, width: `${Math.max(0, s.max - s.min + 1)}%` }" />
      <div v-if="!impossible && !s.found" class="gd-mid" :style="{ left: `${mid - 0.5}%` }" />
      <span class="gd-end l">1</span><span class="gd-end r">100</span>
    </div>
    <div class="gd-row">
      <div class="gd-q" aria-live="polite">
        <template v-if="s.found">
          Found it: <b>{{ mid }}</b>
        </template>
        <template v-else-if="impossible">
          The answers contradict each other: no number fits.
        </template>
        <template v-else>
          Range {{ s.min }} to {{ s.max }}. Is it <b>{{ mid }}</b>?
        </template>
      </div>
      <div class="gd-btns">
        <button type="button" :disabled="s.found || impossible" @click="answer('H')">H (too high)</button>
        <button type="button" :disabled="s.found || impossible" @click="answer('L')">L (too low)</button>
        <button type="button" :disabled="s.found || impossible" @click="answer('F')">F (found)</button>
        <button type="button" class="r" @click="reset">Reset</button>
      </div>
    </div>
    <ol class="gd-log">
      <li v-for="(l, k) in s.log" :key="k">
        {{ l }}
      </li>
    </ol>
  </div>
</template>

<style scoped>
.gd { display: flex; flex-direction: column; gap: 12px; }
.gd-bar { position: relative; height: 44px; margin: 0 14px 18px; border-radius: 8px; background: #e2e8f0; }
.gd-range { position: absolute; top: 0; bottom: 0; background: var(--c-accent-soft, #eef2ff); border: 3px solid var(--c-accent, #3730a3); border-radius: 8px; transition: all 0.4s; }
.gd-mid { position: absolute; top: -6px; bottom: -6px; width: 1%; min-width: 4px; background: var(--c-accent-2, #c2410c); border-radius: 2px; transition: left 0.4s; }
.gd-end { position: absolute; top: 46px; font-size: 18px; color: var(--c-muted, #475569); }
.gd-end.l { left: 0; }
.gd-end.r { right: 0; }
.gd-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.gd-q { font-size: 24px; }
.gd-q b { font-family: var(--slidev-font-mono, monospace); color: var(--c-accent-2, #c2410c); font-size: 30px; }
.gd-btns { display: flex; gap: 8px; }
.gd-btns button { font: inherit; font-size: 18px; padding: 4px 12px; border-radius: 999px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-accent, #3730a3); color: #fff; cursor: pointer; }
.gd-btns button.r { background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); }
.gd-btns button:disabled { opacity: 0.4; cursor: default; }
.gd-log { margin: 0; padding-left: 28px; font-family: var(--slidev-font-mono, monospace); font-size: 18px; line-height: 1.4; columns: 2; min-height: 100px; }
</style>
