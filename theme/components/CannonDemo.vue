<script setup lang="ts">
// A cannon fires at speed v and angle theta above the horizon. The velocity
// arrow is split into its x part (v cos theta) and y part (v sin theta), and
// the Java code that computes them is shown with the current values.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('cannondemo', { theta: 30, v: 50 })

const rad = computed(() => s.theta * Math.PI / 180)
const vx = computed(() => s.v * Math.cos(rad.value))
const vy = computed(() => s.v * Math.sin(rad.value))
const f2 = (n: number) => (Math.abs(n) < 0.005 ? 0 : n).toFixed(2)

// Drawing: origin at the cannon's mouth, 3.6 px per m/s.
const O = { x: 80, y: 236 }
const K = 3.6
const tip = computed(() => ({ x: O.x + vx.value * K, y: O.y - vy.value * K }))
const arc = computed(() => {
  const r = 46
  return `M ${O.x + r} ${O.y} A ${r} ${r} 0 0 0 ${O.x + r * Math.cos(rad.value)} ${O.y - r * Math.sin(rad.value)}`
})
</script>

<template>
  <div class="cd" @keydown.stop>
    <svg viewBox="0 0 400 290" class="cd-svg" role="img" :aria-label="`A cannon fires at ${s.v} metres per second, ${s.theta} degrees above the horizon. The x part is ${f2(vx)} and the y part is ${f2(vy)} metres per second.`">
      <defs>
        <marker id="cd-v" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#0f172a" />
        </marker>
        <marker id="cd-x" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#3730a3" />
        </marker>
        <marker id="cd-y" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#c2410c" />
        </marker>
      </defs>
      <line x1="4" y1="280" x2="396" y2="280" class="cd-ground" />
      <g :transform="`rotate(${-s.theta} ${O.x} ${O.y})`">
        <rect :x="O.x - 46" :y="O.y - 12" width="46" height="24" rx="10" class="cd-barrel" />
      </g>
      <circle :cx="O.x - 24" cy="262" r="16" class="cd-wheel" />
      <path :d="arc" class="cd-arc" />
      <text :x="O.x + 54" :y="O.y - 8" class="cd-lab">θ</text>
      <line v-if="vx > 0.5" :x1="O.x" :y1="O.y" :x2="tip.x - 2" :y2="O.y" class="cd-x" marker-end="url(#cd-x)" />
      <line v-if="vy > 0.5" :x1="tip.x" :y1="O.y" :x2="tip.x" :y2="tip.y + 2" class="cd-y" marker-end="url(#cd-y)" />
      <line :x1="O.x" :y1="O.y" :x2="tip.x" :y2="tip.y" class="cd-v" marker-end="url(#cd-v)" />
      <text :x="(O.x + tip.x) / 2" :y="O.y + 22" class="cd-lab x">x</text>
      <text :x="tip.x + 10" :y="(O.y + tip.y) / 2" class="cd-lab y" style="text-anchor: start">y</text>
      <text :x="(O.x + tip.x) / 2 - 12" :y="(O.y + tip.y) / 2 - 10" class="cd-lab" style="text-anchor: end">v</text>
    </svg>
    <div class="cd-side">
      <label class="cd-s"><span>θ = {{ s.theta }}°</span><input v-model.number="s.theta" type="range" min="0" max="90" step="5" aria-label="Angle in degrees"></label>
      <label class="cd-s"><span>v = {{ s.v }} m/s</span><input v-model.number="s.v" type="range" min="10" max="60" step="5" aria-label="Speed in metres per second"></label>
      <div class="cd-code">
        <div>rad = Math.toRadians(theta)</div>
        <div><span class="kx">x</span> = v * Math.cos(rad)</div>
        <div class="cd-val">
          ≈ <b class="kx">{{ f2(vx) }}</b> m/s
        </div>
        <div><span class="ky">y</span> = v * Math.sin(rad)</div>
        <div class="cd-val">
          ≈ <b class="ky">{{ f2(vy) }}</b> m/s
        </div>
      </div>
      <p class="sr-only" aria-live="polite">
        x is {{ f2(vx) }}, y is {{ f2(vy) }}.
      </p>
    </div>
  </div>
</template>

<style scoped>
.cd {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 18px;
  align-items: center;
}
.cd-svg {
  width: 100%;
}
.cd-ground {
  stroke: var(--c-line, #94a3b8);
  stroke-width: 3;
}
.cd-barrel {
  fill: #334155;
}
.cd-wheel {
  fill: var(--c-paper, #fff);
  stroke: #334155;
  stroke-width: 6;
}
.cd-arc {
  fill: none;
  stroke: var(--c-muted, #475569);
  stroke-width: 2;
}
.cd-v {
  stroke: #0f172a;
  stroke-width: 4;
}
.cd-x {
  stroke: #3730a3;
  stroke-width: 4;
  stroke-dasharray: 8 5;
}
.cd-y {
  stroke: #c2410c;
  stroke-width: 4;
  stroke-dasharray: 8 5;
}
.cd-lab {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
  text-anchor: middle;
  fill: #0f172a;
}
.cd-lab.x {
  fill: #3730a3;
}
.cd-lab.y {
  fill: #c2410c;
}
.cd-side {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cd-s {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
}
.cd-s input {
  accent-color: var(--c-accent, #3730a3);
}
.cd-code {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  line-height: 1.5;
  padding: 10px 12px;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 10px;
}
.cd-val {
  font-size: 22px;
  margin-bottom: 4px;
}
.kx {
  color: #3730a3;
  font-weight: 700;
}
.ky {
  color: #c2410c;
  font-weight: 700;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
