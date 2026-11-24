<script setup lang="ts">
// Click a point on the plane (x and y from -5 to 5). The nested if-else
// from the slides is shown with the path taken highlighted, and the
// quadrant it prints. Points on an axis follow the code (>= 0.0).
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('quadrantdemo', { x: 3, y: 2 })
const px = (v: number) => 130 + v * 24
const py = (v: number) => 130 - v * 24
const xPos = computed(() => s.x >= 0)
const yPos = computed(() => s.y >= 0)
const q = computed(() => (xPos.value ? (yPos.value ? 1 : 4) : (yPos.value ? 2 : 3)))
function pick(e: MouseEvent) {
  const svg = e.currentTarget as SVGSVGElement
  const r = svg.getBoundingClientRect()
  const vx = ((e.clientX - r.left) / r.width) * 260
  const vy = ((e.clientY - r.top) / r.height) * 260
  s.x = Math.max(-5, Math.min(5, Math.round((vx - 130) / 24)))
  s.y = Math.max(-5, Math.min(5, Math.round((130 - vy) / 24)))
}
const line = (on: boolean) => ({ on })
</script>

<template>
  <div class="qd" @keydown.stop>
    <svg viewBox="0 0 260 260" class="qd-svg" role="img" :aria-label="`Point at x ${s.x}, y ${s.y}, in quadrant ${q}`" @click="pick">
      <rect x="0" y="0" width="260" height="260" fill="transparent" />
      <text x="190" y="70" class="qd-q" :class="{ on: q === 1 }">1</text>
      <text x="70" y="70" class="qd-q" :class="{ on: q === 2 }">2</text>
      <text x="70" y="200" class="qd-q" :class="{ on: q === 3 }">3</text>
      <text x="190" y="200" class="qd-q" :class="{ on: q === 4 }">4</text>
      <line x1="10" y1="130" x2="250" y2="130" class="qd-ax" />
      <line x1="130" y1="10" x2="130" y2="250" class="qd-ax" />
      <text x="246" y="122" class="qd-l">x</text>
      <text x="138" y="22" class="qd-l">y</text>
      <circle :cx="px(s.x)" :cy="py(s.y)" r="8" class="qd-pt" />
    </svg>
    <div class="qd-right">
      <div class="qd-sl">
        <label>x = {{ s.x }}.0 <input v-model.number="s.x" type="range" min="-5" max="5" step="1" aria-label="x"></label>
        <label>y = {{ s.y }}.0 <input v-model.number="s.y" type="range" min="-5" max="5" step="1" aria-label="y"></label>
      </div>
      <div class="qd-code">
        <div :class="line(true)">if (x &gt;= 0.0) { <i>{{ xPos }}</i></div>
        <div :class="line(xPos)">&nbsp;&nbsp;if (y &gt;= 0.0) <i v-if="xPos">{{ yPos }}</i></div>
        <div :class="line(xPos && yPos)" class="pr">&nbsp;&nbsp;&nbsp;&nbsp;println("Quadrant 1");</div>
        <div :class="line(xPos)">&nbsp;&nbsp;else</div>
        <div :class="line(xPos && !yPos)" class="pr">&nbsp;&nbsp;&nbsp;&nbsp;println("Quadrant 4");</div>
        <div>}</div>
        <div :class="line(!xPos)">else {</div>
        <div :class="line(!xPos)">&nbsp;&nbsp;if (y &gt;= 0.0) <i v-if="!xPos">{{ yPos }}</i></div>
        <div :class="line(!xPos && yPos)" class="pr">&nbsp;&nbsp;&nbsp;&nbsp;println("Quadrant 2");</div>
        <div :class="line(!xPos)">&nbsp;&nbsp;else</div>
        <div :class="line(!xPos && !yPos)" class="pr">&nbsp;&nbsp;&nbsp;&nbsp;println("Quadrant 3");</div>
        <div>}</div>
      </div>
      <div class="qd-out" aria-live="polite">
        Prints: <b>Quadrant {{ q }}</b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qd { display: grid; grid-template-columns: 250px 1fr; gap: 18px; align-items: start; }
.qd-svg { width: 250px; height: 250px; cursor: crosshair; border: 1px solid #cbd5e1; border-radius: 12px; background: var(--c-paper, #fff); }
.qd-ax { stroke: var(--c-ink, #0f172a); stroke-width: 2; }
.qd-l { font-family: var(--slidev-font-mono, monospace); font-size: 18px; font-weight: 700; fill: var(--c-muted, #475569); }
.qd-q { text-anchor: middle; font-size: 34px; font-weight: 700; fill: #cbd5e1; }
.qd-q.on { fill: var(--c-accent-2, #c2410c); }
.qd-pt { fill: var(--c-accent, #3730a3); }
.qd-right { display: flex; flex-direction: column; gap: 6px; }
.qd-sl { display: flex; gap: 18px; font-family: var(--slidev-font-mono, monospace); font-size: 18px; }
.qd-sl label { display: flex; align-items: center; gap: 8px; }
.qd-sl input { width: 140px; accent-color: var(--c-accent, #3730a3); }
.qd-code { font-family: var(--slidev-font-mono, monospace); font-size: 18px; line-height: 1.28; padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); color: var(--c-muted, #94a3b8); }
.qd-code .on { color: var(--c-ink, #0f172a); }
.qd-code .pr.on { font-weight: 700; background: var(--c-accent-2-soft, #fff7ed); border-radius: 4px; }
.qd-code i { font-style: normal; font-size: 18px; color: var(--c-accent, #3730a3); margin-left: 6px; }
.qd-out { font-size: 20px; }
.qd-out b { color: var(--c-accent-2, #c2410c); }
</style>
