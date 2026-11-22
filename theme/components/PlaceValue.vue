<script setup lang="ts">
// A number as digits in places. Each place is worth `base` times the place
// to its right. Click a digit's arrows to change it; the expansion and the
// value update. The base can be switched between 10 and 2. `places` sets how
// many digits are shown (default 7; up to 11 fits a slide).
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ start?: number, base?: number, allowBase2?: boolean, places?: number }>(), {
  start: 3482931,
  base: 10,
  allowBase2: true,
  places: 7,
})

const PLACES = props.places
const NAMES10 = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions', 'ten millions', 'hundred millions', 'billions', 'ten billions']

function toDigits(n: number, base: number) {
  return Array.from({ length: PLACES }, (_, i) => Math.floor(n / base ** (PLACES - 1 - i)) % base)
}

const s = useSyncedState(`placevalue-${props.start}-${props.places}`, {
  base: props.base,
  digits: toDigits(props.start, props.base),
})

const weights = computed(() => Array.from({ length: PLACES }, (_, i) => s.base ** (PLACES - 1 - i)))
const value = computed(() => s.digits.reduce((sum, d, i) => sum + d * weights.value[i], 0))
const terms = computed(() => s.digits
  .map((d, i) => ({ d, w: weights.value[i] }))
  .filter(t => t.d !== 0))
const fmt = (n: number) => n.toLocaleString('en-US')
// Binary place values stay without commas ("1024") so 11 places fit side by side.
const fmtW = (n: number) => s.base === 10 ? fmt(n) : String(n)
const placeName = (i: number) => s.base === 10 ? NAMES10[PLACES - 1 - i] : `${fmtW(weights.value[i])}s`

function bump(i: number, by: number) {
  s.digits[i] = (s.digits[i] + by + s.base) % s.base
}
function setBase(b: number) {
  const v = Math.min(value.value, b ** PLACES - 1)
  s.base = b
  s.digits = toDigits(v, b)
}
</script>

<template>
  <div class="pv" @keydown.stop>
    <div v-if="allowBase2" class="pv-base" role="group" aria-label="Choose the base">
      <span>Base:</span>
      <button type="button" :class="{ on: s.base === 10 }" :aria-pressed="s.base === 10" @click="setBase(10)">
        10 (decimal)
      </button>
      <button type="button" :class="{ on: s.base === 2 }" :aria-pressed="s.base === 2" @click="setBase(2)">
        2 (binary)
      </button>
    </div>

    <div class="pv-places" :class="{ many: PLACES > 8 }" :style="{ gridTemplateColumns: `repeat(${PLACES}, 1fr)` }">
      <div v-for="(d, i) in s.digits" :key="i" class="pv-place">
        <button type="button" class="pv-arrow" :aria-label="`Increase the ${placeName(i)} digit`" @click="bump(i, 1)">
          ▲
        </button>
        <div class="pv-digit">
          {{ d }}
        </div>
        <button type="button" class="pv-arrow" :aria-label="`Decrease the ${placeName(i)} digit`" @click="bump(i, -1)">
          ▼
        </button>
        <div class="pv-weight">
          × {{ fmtW(weights[i]) }}
        </div>
        <div class="pv-name">
          {{ placeName(i) }}
        </div>
      </div>
    </div>

    <div class="pv-sum" aria-live="polite">
      <span v-if="terms.length === 0">0</span>
      <template v-for="(t, k) in terms" :key="k">
        <span v-if="k > 0"> + </span><span class="pv-term">{{ t.d }} × {{ fmtW(t.w) }}</span>
      </template>
      <span> = <b>{{ fmt(value) }}</b></span>
    </div>
  </div>
</template>

<style scoped>
.pv {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pv-base {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
}
.pv-base button {
  font: inherit;
  font-size: 18px;
  padding: 3px 14px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.pv-base button.on {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.pv-places {
  display: grid;
  gap: 8px;
}
.pv-places.many {
  gap: 4px;
}
.pv-places.many .pv-digit {
  width: 60px;
  height: 64px;
  font-size: 34px;
}
.pv-place {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.pv-arrow {
  width: 44px;
  padding: 0;
  border: 0;
  background: none;
  font-size: 18px;
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.pv-digit {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 40px;
  font-weight: 700;
}
.pv-weight {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  color: var(--c-accent-2, #c2410c);
  white-space: nowrap;
}
.pv-name {
  font-size: 18px;
  color: var(--c-muted, #475569);
  text-align: center;
  line-height: 1.15;
  min-height: 42px;
}
.pv-sum {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.pv-sum b {
  font-size: 24px;
}
.pv-term {
  white-space: nowrap;
}
</style>
