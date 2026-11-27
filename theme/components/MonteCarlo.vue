<script setup lang="ts">
// Monte Carlo estimate of pi: throw random darts at the 1 x 1 square in
// the upper right of a unit circle. Darts with x*x + y*y <= 1 land inside
// the quarter circle; 4 * inside / total estimates pi. Up to 1500 darts are
// drawn; the counts keep going.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const MAX_DRAWN = 1500
const s = useSyncedState('montecarlo', { pts: [] as number[], inside: 0, total: 0 })

function throwDarts(k: number) {
  const pts = s.pts.slice()
  let inside = s.inside
  for (let t = 0; t < k; t++) {
    const x = Math.random()
    const y = Math.random()
    if (x * x + y * y <= 1)
      inside++
    if (pts.length < MAX_DRAWN * 2)
      pts.push(Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000)
  }
  s.pts = pts
  s.inside = inside
  s.total += k
}
function reset() { s.pts = []; s.inside = 0; s.total = 0 }
const est = computed(() => (s.total ? (4 * s.inside / s.total) : 0))
const dots = computed(() => {
  const out: { x: number, y: number, in: boolean }[] = []
  for (let k = 0; k < s.pts.length; k += 2)
    out.push({ x: s.pts[k], y: s.pts[k + 1], in: s.pts[k] ** 2 + s.pts[k + 1] ** 2 <= 1 })
  return out
})
</script>

<template>
  <div class="mc" @keydown.stop>
    <svg viewBox="-12 -12 274 274" class="mc-svg" role="img" :aria-label="`${s.total} darts, ${s.inside} inside the quarter circle; estimate ${est.toFixed(4)}`">
      <rect x="0" y="0" width="250" height="250" class="mc-sq" />
      <path d="M 0 0 A 250 250 0 0 1 250 250 L 0 250 Z" class="mc-q" />
      <circle v-for="(d, k) in dots" :key="k" :cx="d.x * 250" :cy="250 - d.y * 250" r="2.2" :class="d.in ? 'in' : 'out'" />
      <text x="-8" y="262" class="mc-l">0</text>
      <text x="246" y="262" class="mc-l">1</text>
      <text x="-10" y="8" class="mc-l">1</text>
    </svg>
    <div class="mc-side">
      <div class="mc-btns">
        <button v-for="k in [1, 10, 100, 1000]" :key="k" type="button" @click="throwDarts(k)">
          +{{ k }}
        </button>
        <button type="button" class="r" @click="reset">
          Reset
        </button>
      </div>
      <div class="mc-stats" aria-live="polite">
        <div>darts thrown: <b>{{ s.total }}</b></div>
        <div>inside the circle: <b>{{ s.inside }}</b></div>
        <div>4 × {{ s.inside }} / {{ s.total || 1 }} ≈ <b class="pi">{{ s.total ? est.toFixed(4) : '—' }}</b></div>
        <div class="mc-true">
          π = 3.1416…
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mc { display: grid; grid-template-columns: 300px 1fr; gap: 24px; align-items: center; }
.mc-svg { width: 300px; height: 300px; }
.mc-sq { fill: var(--c-paper, #fff); stroke: var(--c-ink, #0f172a); stroke-width: 2; }
.mc-q { fill: var(--c-accent-soft, #eef2ff); stroke: var(--c-accent, #3730a3); stroke-width: 2; }
.mc-svg .in { fill: var(--c-accent, #3730a3); }
.mc-svg .out { fill: var(--c-accent-2, #c2410c); }
.mc-l { font-size: 18px; fill: var(--c-muted, #475569); }
.mc-side { display: flex; flex-direction: column; gap: 16px; }
.mc-btns { display: flex; gap: 8px; flex-wrap: wrap; }
.mc-btns button { font-family: var(--slidev-font-mono, monospace); font-size: 20px; font-weight: 700; padding: 4px 14px; border-radius: 999px; border: 2px solid var(--c-accent, #3730a3); background: var(--c-accent, #3730a3); color: #fff; cursor: pointer; }
.mc-btns button.r { font-family: inherit; background: var(--c-paper, #fff); color: var(--c-accent, #3730a3); }
.mc-stats { display: flex; flex-direction: column; gap: 6px; font-size: 22px; }
.mc-stats b { font-family: var(--slidev-font-mono, monospace); }
.mc-stats .pi { font-size: 32px; color: var(--c-accent-2, #c2410c); }
.mc-true { color: var(--c-muted, #475569); font-size: 20px; }
</style>
