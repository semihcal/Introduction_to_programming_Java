<script setup lang="ts">
// Mix a screen color from red, green and blue values (0-255).
// With the `luminance` prop it also shows the gray version of the color.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = defineProps<{ luminance?: boolean }>()

const color = useSyncedState('mixer', { r: 255, g: 165, b: 0 })

const presets: [string, number, number, number][] = [
  ['Black', 0, 0, 0],
  ['Red', 255, 0, 0],
  ['Green', 0, 255, 0],
  ['Blue', 0, 0, 255],
  ['Orange', 255, 165, 0],
  ['Yellow', 255, 255, 0],
  ['White', 255, 255, 255],
]

const channels = [
  { key: 'r', label: 'Red' },
  { key: 'g', label: 'Green' },
  { key: 'b', label: 'Blue' },
] as const

const css = computed(() => `rgb(${color.r}, ${color.g}, ${color.b})`)
const value = computed(() => Math.round(0.3 * color.r + 0.59 * color.g + 0.11 * color.b))
const grayCss = computed(() => `rgb(${value.value}, ${value.value}, ${value.value})`)

function pick(p: [string, number, number, number]) {
  Object.assign(color, { r: p[1], g: p[2], b: p[3] })
}
</script>

<template>
  <div class="mixer" @keydown.stop>
    <div class="controls">
      <label v-for="ch in channels" :key="ch.key" class="row">
        <span class="name">{{ ch.label }}</span>
        <input v-model.number="color[ch.key]" type="range" min="0" max="255" step="1">
        <span class="num">{{ color[ch.key] }}</span>
      </label>
      <div class="presets">
        <button v-for="p in presets" :key="p[0]" type="button" @click="pick(p)">
          {{ p[0] }}
        </button>
      </div>
    </div>

    <div class="result" aria-live="polite">
      <div class="swatches">
        <div class="item">
          <div class="swatch" :style="{ background: css }" />
          <div class="code">
            new Color({{ color.r }}, {{ color.g }}, {{ color.b }})
          </div>
        </div>
        <div v-if="props.luminance" class="item">
          <div class="swatch" :style="{ background: grayCss }" />
          <div class="code">
            new Color({{ value }}, {{ value }}, {{ value }})
          </div>
        </div>
      </div>
      <div v-if="props.luminance" class="formula">
        Value = .3 × {{ color.r }} + .59 × {{ color.g }} + .11 × {{ color.b }} = <b>{{ value }}</b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mixer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  align-items: center;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.row {
  display: grid;
  grid-template-columns: 80px 1fr 52px;
  align-items: center;
  gap: 12px;
  font-size: 22px;
  font-weight: 600;
}
.row input {
  width: 100%;
  height: 28px;
  accent-color: var(--c-accent, #3730a3);
}
.num {
  font-family: var(--slidev-font-mono, monospace);
  font-weight: 700;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}
.presets button {
  font: inherit;
  font-size: 18px;
  font-weight: 600;
  padding: 2px 12px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.swatches {
  display: flex;
  gap: 20px;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.swatch {
  width: 170px;
  height: 150px;
  border-radius: 16px;
  border: 3px solid var(--c-ink, #0f172a);
}
.code {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
}
.formula {
  font-size: 19px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
