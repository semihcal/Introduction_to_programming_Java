<script setup lang="ts">
// The sentinel average program: enter numbers one at a time; each entry
// runs one more pass of the loop body. A negative number ends the loop,
// then --count runs and the average is printed. Values follow the code on
// the slide exactly (sum starts at 0 and the first pass adds i = 0).
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('sentineldemo', {
  i: 0, sum: 0, count: 0, entered: [] as number[], done: false, draft: '',
})

// The first pass of the body happens before anything is typed.
function start() {
  if (s.count === 0 && !s.done) {
    s.sum += s.i
    s.count++
  }
}
function enter() {
  const v = Number.parseInt(s.draft, 10)
  if (Number.isNaN(v) || s.done)
    return
  start()
  s.draft = ''
  s.i = v
  s.entered.push(v)
  if (s.i >= 0) {
    s.sum += s.i
    s.count++
  }
  else {
    s.count--
    s.done = true
  }
}
function reset() {
  s.i = 0; s.sum = 0; s.count = 0; s.entered = []; s.done = false; s.draft = ''
}
const jd = (x: number) => (Number.isNaN(x) ? 'NaN' : Number.isInteger(x) ? `${x}.0` : String(x))
const avg = computed(() => jd(s.sum / s.count))
</script>

<template>
  <div class="sn" @keydown.stop>
    <div class="sn-in">
      <label>Enter number: <input v-model="s.draft" type="text" inputmode="numeric" :disabled="s.done" aria-label="Number to enter" @keyup.enter="enter"></label>
      <button type="button" :disabled="s.done" @click="enter">Enter</button>
      <button type="button" class="r" @click="reset">Reset</button>
    </div>
    <div class="sn-vars">
      <div><span>i</span><b>{{ s.i }}</b></div>
      <div><span>sum</span><b>{{ jd(s.sum) }}</b></div>
      <div><span>count</span><b>{{ s.count }}</b></div>
    </div>
    <div class="sn-con" aria-live="polite">
      <div class="sn-h">
        Console
      </div>
      <div v-for="(v, k) in s.entered" :key="k">
        Enter number: <span class="u">{{ v }}</span>
      </div>
      <div v-if="!s.done">
        Enter number: <span class="cur">_</span>
      </div>
      <div v-else>
        Average: {{ avg }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.sn { display: flex; flex-direction: column; gap: 10px; }
.sn-in { display: flex; align-items: center; gap: 10px; font-size: 20px; }
.sn-in input { font-family: var(--slidev-font-mono, monospace); font-size: 22px; width: 100px; padding: 2px 8px; border: 2px solid var(--c-accent, #3730a3); border-radius: 8px; }
.sn-in button { font: inherit; font-size: 18px; padding: 3px 14px; border-radius: 999px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-accent, #3730a3); color: #fff; cursor: pointer; }
.sn-in button.r { background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); }
.sn-in button:disabled { opacity: 0.4; cursor: default; }
.sn-vars { display: flex; gap: 22px; }
.sn-vars div { display: flex; align-items: center; gap: 8px; font-family: var(--slidev-font-mono, monospace); font-size: 20px; font-weight: 700; }
.sn-vars b { min-width: 76px; padding: 4px 10px; text-align: center; border: 3px solid var(--c-accent, #3730a3); border-radius: 10px; background: var(--c-accent-soft, #eef2ff); font-size: 22px; }
.sn-con { font-family: var(--slidev-font-mono, monospace); font-size: 19px; line-height: 1.35; padding: 8px 14px; border-radius: 12px; background: #0f172a; color: #e2e8f0; min-height: 110px; max-height: 190px; overflow: auto; }
.sn-h { font-size: 18px; color: #94a3b8; }
.u { color: #fdba74; }
.cur { color: #94a3b8; }
</style>
