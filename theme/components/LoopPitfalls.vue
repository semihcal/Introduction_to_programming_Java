<script setup lang="ts">
// Pick a version of the "print 1 to 40" loop: the correct one or one of
// the five pitfalls. The demo shows the code, the first lines the program
// prints, and what happens in the end.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const V = [
  { name: 'correct', cond: 'i <= 40', semi: false, body: '++i;', out: '1 2 3 … 39 40', end: 'Prints 1 to 40, then i is 41 and the loop ends. 40 lines.', ok: true },
  { name: 'infinite', cond: 'i <= 40', semi: false, body: '', out: '1 1 1 1 1 1 1 …', end: 'i never changes, so 1 <= 40 stays true forever. The program never ends.', ok: false },
  { name: 'almost infinite', cond: 'i <= 40', semi: false, body: '--i;', out: '1 0 -1 -2 -3 …', end: 'i counts down past -2,147,483,648, underflows to 2,147,483,647, and the loop finally ends after about 2.1 billion lines.', ok: false },
  { name: 'fencepost', cond: 'i < 40', semi: false, body: '++i;', out: '1 2 3 … 38 39', end: 'Stops one short: 40 is never printed. 39 lines.', ok: false },
  { name: 'skipped', cond: 'i >= 40', semi: false, body: '++i;', out: '(nothing)', end: '1 >= 40 is false at the first check, so the body never runs.', ok: false },
  { name: 'semicolon', cond: 'i <= 40', semi: true, body: '++i;', out: '(nothing, forever)', end: 'The loop body is the empty statement before the braces. i stays 1, so the empty loop runs forever and the block is never reached.', ok: false },
]
const s = useSyncedState('looppitfalls', { k: 1 })
const v = computed(() => V[s.k])
</script>

<template>
  <div class="lp" @keydown.stop>
    <div class="lp-pick" role="group" aria-label="Version of the loop">
      <button
        v-for="(x, k) in V" :key="x.name" type="button" class="lp-pill"
        :class="{ on: s.k === k, good: x.ok }" :aria-pressed="s.k === k" @click="s.k = k"
      >
        {{ x.name }}
      </button>
    </div>
    <div class="lp-cols">
      <div class="lp-code">
        <div>int i = 1;</div>
        <div>while (<b :class="{ bad: v.cond !== 'i <= 40' }">{{ v.cond }}</b>)<b v-if="v.semi" class="bad">;</b> {</div>
        <div>&nbsp;&nbsp;System.out.println(i);</div>
        <div v-if="v.body">&nbsp;&nbsp;<b :class="{ bad: v.body !== '++i;' }">{{ v.body }}</b></div>
        <div v-else class="lp-miss">
          &nbsp;&nbsp;// nothing changes i
        </div>
        <div>}</div>
      </div>
      <div class="lp-con">
        <div class="lp-h">
          Console
        </div>
        <div>{{ v.out }}</div>
      </div>
    </div>
    <p class="lp-end" :class="{ ok: v.ok }" aria-live="polite">
      {{ v.ok ? '✓' : '✗' }} {{ v.end }}
    </p>
  </div>
</template>

<style scoped>
.lp { display: flex; flex-direction: column; gap: 12px; }
.lp-pick { display: flex; flex-wrap: wrap; gap: 8px; }
.lp-pill { font: inherit; font-size: 18px; padding: 3px 12px; border-radius: 999px; border: 2px solid #b91c1c; background: var(--c-paper, #fff); color: #b91c1c; cursor: pointer; }
.lp-pill.good { border-color: #15803d; color: #15803d; }
.lp-pill.on { background: #b91c1c; color: #fff; }
.lp-pill.good.on { background: #15803d; }
.lp-cols { display: grid; grid-template-columns: 1.2fr 1fr; gap: 14px; }
.lp-code { font-family: var(--slidev-font-mono, monospace); font-size: 21px; line-height: 1.6; padding: 10px 16px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); }
.lp-code b { color: var(--c-accent, #3730a3); }
.lp-code b.bad { color: #b91c1c; background: #fee2e2; border-radius: 4px; padding: 0 3px; }
.lp-miss { color: #b91c1c; font-style: italic; }
.lp-con { font-family: var(--slidev-font-mono, monospace); font-size: 21px; line-height: 1.5; padding: 10px 14px; border-radius: 12px; background: #0f172a; color: #e2e8f0; }
.lp-h { font-size: 18px; color: #94a3b8; }
.lp-end { margin: 0; font-size: 20px; padding: 8px 14px; border: 2px dashed #b91c1c; border-radius: 10px; }
.lp-end.ok { border: 2px solid #15803d; }
</style>
