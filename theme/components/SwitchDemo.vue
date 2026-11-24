<script setup lang="ts">
// The fall-through example: switch (data) with case 3 (no break), case 4
// (break) and case 5. data is chosen with buttons; a toggle adds a break
// after case 3. Lines that run are highlighted; the console shows output.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('switchdemo', { data: 3, brk: false })

// Which println lines run, following Java: jump to the matching case, then
// run until a break or the end of the switch.
const runs = computed(() => {
  const out: string[] = []
  const order = [3, 4, 5]
  let k = order.indexOf(s.data)
  if (k < 0)
    return out
  for (; k < order.length; k++) {
    const v = order[k]
    out.push(['Three', 'Four', 'Five'][v - 3])
    if (v === 4 || (v === 3 && s.brk))
      break
  }
  return out
})
const on = (w: string) => runs.value.includes(w)
</script>

<template>
  <div class="sw" @keydown.stop>
    <div class="sw-ctl">
      <span class="sw-group" role="group" aria-label="Value of data">
        <code>int data =</code>
        <button
          v-for="v in [2, 3, 4, 5, 6]" :key="v" type="button" class="sw-pill"
          :class="{ on: s.data === v }" :aria-pressed="s.data === v" @click="s.data = v"
        >{{ v }}</button>
      </span>
      <label class="sw-tog"><input v-model="s.brk" type="checkbox"> add <code>break;</code> after case 3</label>
    </div>
    <div class="sw-cols">
      <div class="sw-code">
        <div>switch (data) {</div>
        <div :class="{ hit: s.data === 3 }">&nbsp;&nbsp;case 3:</div>
        <div class="pr" :class="{ on: on('Three') }">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println("Three");</div>
        <div v-if="s.brk" class="pr" :class="{ on: on('Three') }">&nbsp;&nbsp;&nbsp;&nbsp;break;</div>
        <div :class="{ hit: s.data === 4 }">&nbsp;&nbsp;case 4:</div>
        <div class="pr" :class="{ on: on('Four') }">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println("Four");</div>
        <div class="pr" :class="{ on: on('Four') }">&nbsp;&nbsp;&nbsp;&nbsp;break;</div>
        <div :class="{ hit: s.data === 5 }">&nbsp;&nbsp;case 5:</div>
        <div class="pr" :class="{ on: on('Five') }">&nbsp;&nbsp;&nbsp;&nbsp;System.out.println("Five");</div>
        <div>}</div>
      </div>
      <div class="sw-con" aria-live="polite">
        <div class="sw-h">
          Console
        </div>
        <div v-for="w in runs" :key="w">
          {{ w }}
        </div>
        <div v-if="!runs.length" class="sw-none">
          (nothing: no case matches, and there is no default)
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sw { display: flex; flex-direction: column; gap: 12px; }
.sw-ctl { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; font-size: 20px; }
.sw-group { display: flex; align-items: center; gap: 6px; }
.sw-pill { font-family: var(--slidev-font-mono, monospace); font-size: 20px; font-weight: 700; min-width: 40px; padding: 2px 10px; border-radius: 8px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); cursor: pointer; }
.sw-pill.on { background: var(--c-accent, #3730a3); color: #fff; }
.sw-tog { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.sw-tog input { width: 20px; height: 20px; accent-color: var(--c-accent-2, #c2410c); }
.sw-cols { display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; }
.sw-code { font-family: var(--slidev-font-mono, monospace); font-size: 19px; line-height: 1.5; padding: 8px 14px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); }
.sw-code .hit { color: var(--c-accent, #3730a3); font-weight: 700; }
.sw-code .hit::after { content: '  ← jump here'; font-family: var(--slidev-font-sans); font-size: 18px; color: var(--c-accent-2, #c2410c); }
.sw-code .pr { color: #94a3b8; }
.sw-code .pr.on { color: var(--c-ink, #0f172a); font-weight: 700; background: var(--c-accent-2-soft, #fff7ed); border-radius: 4px; }
.sw-con { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 10px 14px; border-radius: 12px; background: #0f172a; color: #e2e8f0; }
.sw-h { font-size: 18px; color: #94a3b8; }
.sw-none { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; }
</style>
