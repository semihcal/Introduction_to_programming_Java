<script setup lang="ts">
// Step through a linear search (unsorted array) or a binary search
// (sorted array) for a chosen number, counting the comparisons.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ mode?: 'linear' | 'binary' }>(), { mode: 'binary' })

const arr = props.mode === 'binary'
  ? [2, 7, 15, 23, 28, 31, 37, 54, 61, 70, 77, 83, 91, 96, 99]
  : [54, 7, 91, 23, 70, 2, 37, 99, 15, 83, 31, 61, 28, 77, 96]
const targets = [37, 2, 99, 50]

function fresh(target: number) {
  return {
    target,
    lo: 0,
    hi: arr.length - 1,
    checked: [] as number[],
    found: -1,
    done: false,
    msg: props.mode === 'binary'
      ? 'The list is sorted. Press Step to check the middle.'
      : 'Press Step to check the first element.',
  }
}

const s = useSyncedState(`search-${props.mode}`, fresh(37))
const last = computed(() => s.checked.length ? s.checked[s.checked.length - 1] : -1)

function choose(target: number) {
  Object.assign(s, fresh(target))
}

function step() {
  if (s.done)
    return
  if (props.mode === 'linear') {
    const i = s.checked.length
    s.checked.push(i)
    if (arr[i] === s.target) {
      s.found = i
      s.done = true
      s.msg = `Index ${i} holds ${arr[i]}: found it. Return ${i}.`
    }
    else if (i === arr.length - 1) {
      s.done = true
      s.msg = `Reached the end without finding ${s.target}. Return -1.`
    }
    else {
      s.lo = i + 1
      s.msg = `Index ${i} holds ${arr[i]}, not ${s.target}. Move to the next element.`
    }
    return
  }
  const mid = Math.floor((s.lo + s.hi) / 2)
  s.checked.push(mid)
  if (arr[mid] === s.target) {
    s.found = mid
    s.done = true
    s.msg = `Middle is index ${mid}: ${arr[mid]}. Found it!`
  }
  else if (arr[mid] > s.target) {
    s.hi = mid - 1
    s.msg = `Middle is index ${mid}: ${arr[mid]} is too high. Keep the left part.`
  }
  else {
    s.lo = mid + 1
    s.msg = `Middle is index ${mid}: ${arr[mid]} is too low. Keep the right part.`
  }
  if (!s.done && s.lo > s.hi) {
    s.done = true
    s.msg += ` Nothing is left, so ${s.target} is not in the list.`
  }
}
</script>

<template>
  <div class="sd" @keydown.stop>
    <div class="sd-bar">
      <span class="sd-label">Search for</span>
      <button
        v-for="t in targets"
        :key="t"
        type="button"
        :class="{ on: s.target === t }"
        :aria-pressed="s.target === t"
        @click="choose(t)"
      >
        {{ t }}
      </button>
      <span class="sd-gap" />
      <button type="button" class="primary" :disabled="s.done" @click="step">
        Step
      </button>
      <button type="button" @click="choose(s.target)">
        Reset
      </button>
    </div>

    <div class="sd-row" role="img" :aria-label="`An array of ${arr.length} numbers: ${arr.join(', ')}. ${s.msg}`">
      <div
        v-for="(v, i) in arr"
        :key="i"
        class="sd-cell"
        :class="{
          out: !s.done && (i < s.lo || i > s.hi) && s.found !== i,
          gone: s.done && s.found !== i,
          now: last === i && s.found !== i,
          hit: s.found === i,
        }"
      >
        <div class="sd-val">
          {{ v }}
        </div>
        <div class="sd-idx">
          {{ i }}
        </div>
      </div>
    </div>

    <div class="sd-status" aria-live="polite">
      <div>{{ s.msg }}</div>
      <div class="sd-count">
        Comparisons so far: <b>{{ s.checked.length }}</b>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sd {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sd-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
}
.sd-label {
  font-weight: 600;
  margin-right: 4px;
}
.sd-gap {
  flex: 1;
}
.sd-bar button {
  font: inherit;
  font-size: 19px;
  font-weight: 700;
  padding: 3px 16px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.sd-bar button.on,
.sd-bar button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.sd-bar button:disabled {
  opacity: 0.45;
  cursor: default;
}
.sd-row {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  gap: 4px;
}
.sd-cell {
  text-align: center;
}
.sd-val {
  height: 52px;
  display: grid;
  place-items: center;
  border: 3px solid var(--c-ink, #0f172a);
  border-radius: 8px;
  background: var(--c-paper, #fff);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  font-weight: 700;
}
.sd-idx {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  color: var(--c-muted, #475569);
}
/* Ruled out: faded and dashed, so the cue is not color alone. */
.sd-cell.out .sd-val,
.sd-cell.gone .sd-val {
  border-style: dashed;
  border-color: var(--c-line, #94a3b8);
  color: var(--c-line, #94a3b8);
  background: transparent;
}
.sd-cell.now .sd-val {
  border: 5px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
  color: var(--c-ink, #0f172a);
}
.sd-cell.hit .sd-val {
  border-color: var(--c-accent, #3730a3);
  background: var(--c-accent, #3730a3);
  color: #ffffff;
}
.sd-status {
  font-size: 21px;
  line-height: 1.4;
  min-height: 92px;
  padding: 10px 18px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.sd-count {
  color: var(--c-muted, #475569);
}
</style>
