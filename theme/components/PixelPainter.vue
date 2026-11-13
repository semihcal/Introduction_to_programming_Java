<script setup lang="ts">
// A tiny Picture: a grid of pixels addressed by (x, y), each with a Color.
// Click a pixel to "get" it; the buttons "set" every pixel with nested loops.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const W = 16
const H = 10

type RGB = [number, number, number]

// A small sunset drawn by formula, so no image file is needed.
function original(): RGB[][] {
  const rows: RGB[][] = []
  for (let y = 0; y < H; y++) {
    const row: RGB[] = []
    for (let x = 0; x < W; x++) {
      const t = y / (H - 1)
      let c: RGB = [Math.round(60 + 195 * t), Math.round(120 + 60 * t), Math.round(220 - 140 * t)]
      if ((x - 11) ** 2 + (y - 3) ** 2 <= 5)
        c = [255, 230, 80]
      if (y >= 7)
        c = [30, Math.round(140 - 20 * (y - 7)), 60]
      row.push(c)
    }
    rows.push(row)
  }
  return rows
}

const pic = useSyncedState('painter', {
  px: original(),
  sel: { x: 11, y: 3 },
  last: 'Picture loaded: 16 wide, 10 high.',
})

const selected = computed(() => pic.px[pic.sel.y][pic.sel.x])

function setAll(fn: (c: RGB) => RGB, message: string) {
  pic.px = pic.px.map(row => row.map(c => fn(c)))
  pic.last = message
}

function fillBlue() {
  setAll(() => [0, 0, 255], 'Set every pixel to new Color(0, 0, 255).')
}
function darken() {
  setAll(c => [Math.floor(c[0] / 2), Math.floor(c[1] / 2), Math.floor(c[2] / 2)], 'Halved the red, green and blue of every pixel.')
}
function gray() {
  setAll((c) => {
    const v = Math.round(0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2])
    return [v, v, v]
  }, 'Replaced every pixel with its luminance gray.')
}
function reset() {
  pic.px = original()
  pic.last = 'Picture loaded: 16 wide, 10 high.'
}
</script>

<template>
  <div class="painter" @keydown.stop>
    <div
      class="grid"
      role="group"
      aria-label="A picture 16 pixels wide and 10 pixels high. Click a pixel to read its color."
      :style="{ gridTemplateColumns: `repeat(${W}, 27px)` }"
    >
      <template v-for="(row, y) in pic.px" :key="y">
        <button
          v-for="(c, x) in row"
          :key="`${x}-${y}`"
          type="button"
          class="px"
          :class="{ sel: pic.sel.x === x && pic.sel.y === y }"
          :style="{ background: `rgb(${c[0]}, ${c[1]}, ${c[2]})` }"
          :aria-label="`Pixel x ${x}, y ${y}: red ${c[0]}, green ${c[1]}, blue ${c[2]}`"
          tabindex="-1"
          @click="pic.sel = { x, y }"
        />
      </template>
    </div>

    <div class="panel">
      <div class="buttons">
        <button type="button" @click="fillBlue">
          Fill blue
        </button>
        <button type="button" @click="darken">
          Darken 50%
        </button>
        <button type="button" @click="gray">
          Gray
        </button>
        <button type="button" class="ghost" @click="reset">
          Reset
        </button>
      </div>
      <div class="readout" aria-live="polite">
        <div class="code">
          picture.get({{ pic.sel.x }}, {{ pic.sel.y }})
        </div>
        <div class="value">
          <span class="chip" :style="{ background: `rgb(${selected[0]}, ${selected[1]}, ${selected[2]})` }" />
          Color({{ selected[0] }}, {{ selected[1] }}, {{ selected[2] }})
        </div>
        <div class="last">
          {{ pic.last }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.painter {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 32px;
  align-items: center;
}
.grid {
  display: grid;
  grid-auto-rows: 27px;
  gap: 1px;
  padding: 1px;
  background: var(--c-ink, #0f172a);
  border-radius: 6px;
}
.px {
  padding: 0;
  border: 0;
  cursor: pointer;
}
.px.sel {
  outline: 3px solid #ffffff;
  box-shadow: 0 0 0 6px var(--c-ink, #0f172a);
  position: relative;
  z-index: 1;
}
.panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.buttons button {
  font: inherit;
  font-size: 19px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 10px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  cursor: pointer;
}
.buttons button.ghost {
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
}
.readout {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.code,
.value {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 21px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.value {
  display: flex;
  align-items: center;
  gap: 10px;
}
.chip {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 2px solid var(--c-ink, #0f172a);
  flex: none;
}
.last {
  font-size: 18px;
  color: var(--c-muted, #475569);
  line-height: 1.3;
}
</style>
