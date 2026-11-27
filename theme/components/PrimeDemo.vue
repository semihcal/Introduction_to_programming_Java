<script setup lang="ts">
// Trial division: a slider picks n from 2 to 60. Every d from 2 to n - 1
// is shown; the ones that divide n evenly are marked. If none do, n is
// prime. The second row lists all primes from 2 up to n, as the nested
// loop version prints them.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('primedemo', { n: 21 })
const ds = computed(() => Array.from({ length: Math.max(0, s.n - 2) }, (_, k) => k + 2))
const divides = (d: number) => s.n % d === 0
const isPrime = (k: number) => {
  if (k < 2)
    return false
  for (let d = 2; d < k; d++) {
    if (k % d === 0)
      return false
  }
  return true
}
const prime = computed(() => isPrime(s.n))
const firstDiv = computed(() => ds.value.find(divides))
const primes = computed(() => Array.from({ length: s.n - 1 }, (_, k) => k + 2).filter(isPrime))
</script>

<template>
  <div class="pr" @keydown.stop>
    <label class="pr-sl">
      <code>int n = {{ s.n }};</code>
      <input v-model.number="s.n" type="range" min="2" max="60" step="1" aria-label="n">
    </label>
    <div class="pr-lab">
      Is n % d == 0 for some d from 2 to {{ s.n - 1 }}?
    </div>
    <div class="pr-ds">
      <span v-if="!ds.length" class="pr-none">(no d to try: the loop body never runs)</span>
      <span v-for="d in ds" :key="d" class="pr-d" :class="{ hit: divides(d) }">{{ d }}</span>
    </div>
    <p class="pr-out" :class="{ p: prime }" aria-live="polite">
      <template v-if="prime">
        No d divides {{ s.n }} evenly: <b>Prime</b>
      </template>
      <template v-else>
        {{ s.n }} % {{ firstDiv }} == 0 (and {{ ds.filter(divides).length }} divisor{{ ds.filter(divides).length === 1 ? '' : 's' }} in all): <b>Composite</b>
      </template>
    </p>
    <div class="pr-list">
      <span class="pr-lt">Primes from 2 to {{ s.n }}:</span> {{ primes.join(' ') }}
    </div>
  </div>
</template>

<style scoped>
.pr { display: flex; flex-direction: column; gap: 10px; }
.pr-sl { display: flex; align-items: center; gap: 16px; font-size: 20px; }
.pr-sl input { flex: 1; accent-color: var(--c-accent, #3730a3); }
.pr-lab { font-size: 20px; color: var(--c-muted, #475569); }
.pr-ds { display: flex; flex-wrap: wrap; gap: 4px; min-height: 40px; }
.pr-d { font-family: var(--slidev-font-mono, monospace); font-size: 18px; min-width: 34px; text-align: center; padding: 2px 4px; border: 1px solid var(--c-line, #94a3b8); border-radius: 6px; color: var(--c-muted, #475569); }
.pr-d.hit { border: 2px solid var(--c-accent-2, #c2410c); background: var(--c-accent-2-soft, #fff7ed); color: var(--c-ink, #0f172a); font-weight: 700; }
.pr-none { font-size: 18px; color: var(--c-muted, #475569); }
.pr-out { margin: 0; font-size: 22px; padding: 6px 14px; border-radius: 10px; border: 2px dashed var(--c-accent-2, #c2410c); }
.pr-out.p { border: 2px solid var(--c-accent, #3730a3); }
.pr-list { font-family: var(--slidev-font-mono, monospace); font-size: 20px; padding: 6px 14px; border-radius: 10px; background: #0f172a; color: #e2e8f0; }
.pr-lt { font-family: var(--slidev-font-sans); font-size: 18px; color: #94a3b8; }
</style>
