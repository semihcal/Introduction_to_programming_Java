<script setup lang="ts">
// Shows where one pixel goes when a picture is mirrored, rotated or doubled.
// Click a pixel in either grid; the matching pixel in the other grid is
// outlined and the index formula is worked out with the actual numbers.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

type Mode = 'mirror-h' | 'mirror-v' | 'rotate' | 'double'
const props = withDefaults(defineProps<{ mode?: Mode }>(), { mode: 'mirror-h' })

// Original picture: 2 x 2 for doubling, otherwise 3 wide and 4 high.
const w = props.mode === 'double' ? 2 : 3
const h = props.mode === 'double' ? 2 : 4
const rw = props.mode === 'rotate' ? h : props.mode === 'double' ? w * 2 : w
const rh = props.mode === 'rotate' ? w : props.mode === 'double' ? h * 2 : h

const letters = 'ABCDEFGHIJKL'
const letterAt = (x: number, y: number) => letters[y * w + x]
const tint = (x: number, y: number) => `hsl(${(y * w + x) * (360 / (w * h))}, 75%, 86%)`

// Where the original pixel (x, y) ends up in the result.
function forward(x: number, y: number) {
  if (props.mode === 'mirror-h')
    return { x: w - x - 1, y }
  if (props.mode === 'mirror-v')
    return { x, y: h - y - 1 }
  if (props.mode === 'rotate')
    return { x: h - y - 1, y: x }
  return { x: x * 2, y: y * 2 }
}
// Which original pixel the result pixel (x, y) was copied from.
function backward(x: number, y: number) {
  if (props.mode === 'mirror-h')
    return { x: w - x - 1, y }
  if (props.mode === 'mirror-v')
    return { x, y: h - y - 1 }
  if (props.mode === 'rotate')
    return { x: y, y: h - x - 1 }
  return { x: Math.floor(x / 2), y: Math.floor(y / 2) }
}

// For doubling the selection is a pixel of the new picture; otherwise it is
// a pixel of the original.
const sel = useSyncedState(`transform-${props.mode}`, { x: props.mode === 'double' ? 3 : 0, y: 1 })

const src = computed(() => props.mode === 'double' ? backward(sel.x, sel.y) : { x: sel.x, y: sel.y })
const dst = computed(() => props.mode === 'double' ? { x: sel.x, y: sel.y } : forward(sel.x, sel.y))

function pickOriginal(x: number, y: number) {
  Object.assign(sel, props.mode === 'double' ? forward(x, y) : { x, y })
}
function pickResult(x: number, y: number) {
  Object.assign(sel, props.mode === 'double' ? { x, y } : backward(x, y))
}

const resultName = computed(() => ({
  'mirror-h': 'Mirrored',
  'mirror-v': 'Mirrored',
  'rotate': 'Rotated',
  'double': 'Doubled',
}[props.mode]))

const code = computed(() => ({
  'mirror-h': 'mirrored.set(w - x - 1, y, color)',
  'mirror-v': 'mirrored.set(x, h - y - 1, color)',
  'rotate': 'rotated.set(h - y - 1, x, color)',
  'double': 'new (x, y) copies old (x / 2, y / 2)',
}[props.mode]))

const worked = computed(() => {
  const s = src.value
  const d = dst.value
  if (props.mode === 'mirror-h')
    return `w = ${w}. Pixel (${s.x}, ${s.y}) goes to (${w} − ${s.x} − 1, ${s.y}) = (${d.x}, ${d.y}).`
  if (props.mode === 'mirror-v')
    return `h = ${h}. Pixel (${s.x}, ${s.y}) goes to (${s.x}, ${h} − ${s.y} − 1) = (${d.x}, ${d.y}).`
  if (props.mode === 'rotate')
    return `h = ${h}. Pixel (${s.x}, ${s.y}) goes to (${h} − ${s.y} − 1, ${s.x}) = (${d.x}, ${d.y}).`
  return `New pixel (${d.x}, ${d.y}) copies old pixel (${d.x} / 2, ${d.y} / 2) = (${s.x}, ${s.y}).`
})
</script>

<template>
  <div class="tf" @keydown.stop>
    <div class="tf-grids">
      <div class="tf-pic">
        <div class="tf-title">
          Original · {{ w }} wide, {{ h }} high
        </div>
        <div class="tf-xs" :style="{ gridTemplateColumns: `repeat(${w}, 46px)` }" aria-hidden="true">
          <span v-for="x in w" :key="x">{{ x - 1 }}</span>
        </div>
        <div class="tf-body">
          <div class="tf-ys" aria-hidden="true">
            <span v-for="y in h" :key="y">{{ y - 1 }}</span>
          </div>
          <div class="tf-grid" role="group" aria-label="Original picture. Click a pixel." :style="{ gridTemplateColumns: `repeat(${w}, 46px)` }">
            <template v-for="y in h" :key="y">
              <button
                v-for="x in w"
                :key="`${x}-${y}`"
                type="button"
                class="tf-px"
                :class="{ on: src.x === x - 1 && src.y === y - 1 }"
                :style="{ background: tint(x - 1, y - 1) }"
                :aria-label="`Original pixel x ${x - 1}, y ${y - 1}, letter ${letterAt(x - 1, y - 1)}`"
                @click="pickOriginal(x - 1, y - 1)"
              >
                {{ letterAt(x - 1, y - 1) }}
              </button>
            </template>
          </div>
        </div>
      </div>

      <div class="tf-arrow" aria-hidden="true">
        →
      </div>

      <div class="tf-pic">
        <div class="tf-title">
          {{ resultName }} · {{ rw }} wide, {{ rh }} high
        </div>
        <div class="tf-xs" :style="{ gridTemplateColumns: `repeat(${rw}, 46px)` }" aria-hidden="true">
          <span v-for="x in rw" :key="x">{{ x - 1 }}</span>
        </div>
        <div class="tf-body">
          <div class="tf-ys" aria-hidden="true">
            <span v-for="y in rh" :key="y">{{ y - 1 }}</span>
          </div>
          <div class="tf-grid" role="group" :aria-label="`${resultName} picture. Click a pixel.`" :style="{ gridTemplateColumns: `repeat(${rw}, 46px)` }">
            <template v-for="y in rh" :key="y">
              <button
                v-for="x in rw"
                :key="`${x}-${y}`"
                type="button"
                class="tf-px"
                :class="{ on: dst.x === x - 1 && dst.y === y - 1 }"
                :style="{ background: tint(backward(x - 1, y - 1).x, backward(x - 1, y - 1).y) }"
                :aria-label="`${resultName} pixel x ${x - 1}, y ${y - 1}, letter ${letterAt(backward(x - 1, y - 1).x, backward(x - 1, y - 1).y)}`"
                @click="pickResult(x - 1, y - 1)"
              >
                {{ letterAt(backward(x - 1, y - 1).x, backward(x - 1, y - 1).y) }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="tf-panel" aria-live="polite">
      <div class="tf-code">
        {{ code }}
      </div>
      <div class="tf-worked">
        {{ worked }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tf {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.tf-grids {
  display: flex;
  align-items: center;
  gap: 22px;
}
.tf-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
  padding-left: 28px;
  white-space: nowrap;
}
.tf-xs {
  display: grid;
  gap: 2px;
  margin-left: 28px;
  padding-left: 2px;
}
.tf-xs span,
.tf-ys span {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  color: var(--c-muted, #475569);
  text-align: center;
}
.tf-body {
  display: flex;
}
.tf-ys {
  display: grid;
  grid-auto-rows: 46px;
  gap: 2px;
  width: 28px;
  padding-top: 2px;
  align-items: center;
}
.tf-grid {
  display: grid;
  grid-auto-rows: 46px;
  gap: 2px;
  padding: 2px;
  background: var(--c-ink, #0f172a);
  border-radius: 6px;
}
.tf-px {
  padding: 0;
  border: 0;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
  color: var(--c-ink, #0f172a);
  cursor: pointer;
}
.tf-px.on {
  outline: 5px solid var(--c-accent-2, #c2410c);
  outline-offset: -5px;
}
.tf-arrow {
  font-size: 40px;
  font-weight: 700;
  color: var(--c-accent, #3730a3);
}
.tf-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.tf-code {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 21px;
  font-weight: 700;
  color: var(--c-accent, #3730a3);
  white-space: nowrap;
}
.tf-worked {
  font-size: 20px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
