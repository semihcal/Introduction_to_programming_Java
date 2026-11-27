<script setup lang="ts">
// An int array of length 10 in memory, starting at address 524. Each int
// takes 4 bytes, so element i lives at 524 + 4 * i. A stepper chooses the
// index (from -1 to 10, so out-of-range indexes can be tried); the chosen
// cell is highlighted with its address worked out.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const VALUES = [12, 43, -9, 6, 789, 0, -23, 23, 10, 6]
const START = 524
const s = useSyncedState('arraymemory', { i: 3 })
const ok = computed(() => s.i >= 0 && s.i < VALUES.length)
function bump(by: number) {
  s.i = Math.max(-1, Math.min(VALUES.length, s.i + by))
}
</script>

<template>
  <div class="am" @keydown.stop>
    <div class="am-grid" role="img" :aria-label="`An int array of 10 elements starting at address ${START}`">
      <div class="am-lab">
        address
      </div>
      <div v-for="(v, k) in VALUES" :key="'a' + k" class="am-addr" :class="{ on: k === s.i }">
        {{ START + 4 * k }}
      </div>
      <div class="am-lab">
        value
      </div>
      <div v-for="(v, k) in VALUES" :key="'v' + k" class="am-cell" :class="{ on: k === s.i }">
        {{ v }}
      </div>
      <div class="am-lab">
        index
      </div>
      <div v-for="(v, k) in VALUES" :key="'i' + k" class="am-idx" :class="{ on: k === s.i }">
        {{ k }}
      </div>
    </div>
    <div class="am-ctl">
      <code>list[</code>
      <button type="button" aria-label="Decrease index" @click="bump(-1)">−</button>
      <b>{{ s.i }}</b>
      <button type="button" aria-label="Increase index" @click="bump(1)">+</button>
      <code>]</code>
    </div>
    <p class="am-out" :class="{ err: !ok }" aria-live="polite">
      <template v-if="ok">
        <code>list[{{ s.i }}]</code> is <b>{{ VALUES[s.i] }}</b>, stored at {{ START }} + 4 × {{ s.i }} = <b>{{ START + 4 * s.i }}</b>
      </template>
      <template v-else>
        <code>list[{{ s.i }}]</code> → <b>ArrayIndexOutOfBoundsException</b>: the indexes are 0 to {{ VALUES.length - 1 }}
      </template>
    </p>
  </div>
</template>

<style scoped>
.am { display: flex; flex-direction: column; gap: 12px; }
.am-grid { display: grid; grid-template-columns: 90px repeat(10, 1fr); gap: 3px 4px; align-items: center; }
.am-lab { font-size: 18px; color: var(--c-muted, #475569); text-align: right; padding-right: 6px; }
.am-addr, .am-idx { font-family: var(--slidev-font-mono, monospace); font-size: 18px; text-align: center; color: var(--c-muted, #475569); }
.am-addr.on, .am-idx.on { color: var(--c-accent-2, #c2410c); font-weight: 700; }
.am-cell { font-family: var(--slidev-font-mono, monospace); font-size: 22px; font-weight: 700; text-align: center; padding: 10px 0; border: 2px solid var(--c-accent, #3730a3); background: var(--c-accent-soft, #eef2ff); }
.am-cell.on { border: 3px solid var(--c-accent-2, #c2410c); background: var(--c-accent-2-soft, #fff7ed); }
.am-ctl { display: flex; align-items: center; gap: 8px; font-size: 24px; }
.am-ctl button { width: 38px; font-size: 22px; border-radius: 8px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); cursor: pointer; }
.am-ctl b { font-family: var(--slidev-font-mono, monospace); min-width: 30px; text-align: center; }
.am-out { margin: 0; font-size: 22px; padding: 8px 14px; border: 2px solid var(--c-accent, #3730a3); border-radius: 10px; }
.am-out.err { border: 2px dashed #b91c1c; font-size: 20px; }
</style>
