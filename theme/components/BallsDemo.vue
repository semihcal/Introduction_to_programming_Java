<script setup lang="ts">
// The nine-ball puzzle: one ball is slightly heavier. Put balls on the two
// pans of a balance and weigh, using as few weighings as possible.
// Click a ball to pick it up, then click the place to put it: the left pan,
// the table or the right pan. Any ball can go straight to any place.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const BENCH = 0
const LEFT = 1
const RIGHT = 2
const placeName = ['the table', 'the left pan', 'the right pan']

type Outcome = 'left' | 'right' | 'balance'

function fresh() {
  return {
    heavy: Math.floor(Math.random() * 9),
    side: Array.from({ length: 9 }, () => BENCH),
    sel: -1,
    weighings: 0,
    log: [] as string[],
    // Result of the last weighing, kept only while the pans are unchanged.
    last: null as Outcome | null,
    revealed: false,
  }
}

const s = useSyncedState('balls', fresh(), { shareInitial: true })

const on = (where: number) => s.side.map((v, i) => v === where ? i : -1).filter(i => i >= 0)
const left = computed(() => on(LEFT))
const right = computed(() => on(RIGHT))
const bench = computed(() => on(BENCH))
const names = (list: number[]) => list.map(i => i + 1).join(', ')

const canWeigh = computed(() => left.value.length > 0 && left.value.length === right.value.length)

const status = computed(() => {
  if (s.sel >= 0)
    return `Ball ${s.sel + 1} is picked up. Click the left pan, the table or the right pan to put it there.`
  if (s.last)
    return 'Change the pans and weigh again, or reveal the answer.'
  if (left.value.length === 0 && right.value.length === 0)
    return 'Click a ball to pick it up, then click where to put it.'
  if (!canWeigh.value)
    return `Put the same number of balls on each pan before weighing (now ${left.value.length} and ${right.value.length}).`
  return `Ready to weigh ${left.value.length} against ${right.value.length}.`
})

function pick(i: number) {
  s.sel = s.sel === i ? -1 : i
}
function place(where: number) {
  if (s.sel < 0)
    return
  if (s.side[s.sel] !== where) {
    s.side[s.sel] = where
    s.last = null
  }
  s.sel = -1
}
function weigh() {
  if (!canWeigh.value)
    return
  s.sel = -1
  s.weighings++
  let outcome: Outcome = 'balance'
  if (left.value.includes(s.heavy))
    outcome = 'left'
  else if (right.value.includes(s.heavy))
    outcome = 'right'
  s.last = outcome
  const text = { left: 'left pan heavier', right: 'right pan heavier', balance: 'the pans balance' }[outcome]
  s.log.push(`${names(left.value)} against ${names(right.value)}: ${text}.`)
}
function clearPans() {
  s.side = s.side.map(() => BENCH)
  s.sel = -1
  s.last = null
}
function restart() {
  Object.assign(s, fresh())
}

const zones = [
  { where: LEFT, title: 'Left pan', list: left },
  { where: BENCH, title: 'On the table', list: bench },
  { where: RIGHT, title: 'Right pan', list: right },
]
function panLabel(where: number) {
  if (!s.last || where === BENCH)
    return ''
  if (s.last === 'balance')
    return 'balanced'
  return (s.last === 'left') === (where === LEFT) ? 'heavier ↓' : 'lighter ↑'
}
</script>

<template>
  <div class="bd" @keydown.stop>
    <div class="bd-zones">
      <div
        v-for="z in zones"
        :key="z.where"
        class="bd-zone"
        :class="{
          pan: z.where !== BENCH,
          target: s.sel >= 0 && s.side[s.sel] !== z.where,
          down: panLabel(z.where) === 'heavier ↓',
          up: panLabel(z.where) === 'lighter ↑',
        }"
        @click.self="place(z.where)"
      >
        <button
          type="button"
          class="bd-title"
          :disabled="s.sel < 0 || s.side[s.sel] === z.where"
          :aria-label="s.sel >= 0 ? `Put ball ${s.sel + 1} on ${placeName[z.where]}` : z.title"
          @click="place(z.where)"
        >
          {{ z.title }}<span v-if="s.sel >= 0 && s.side[s.sel] !== z.where" class="bd-here"> · put here</span>
        </button>
        <div class="bd-balls" @click.self="place(z.where)">
          <button
            v-for="i in z.list.value"
            :key="i"
            type="button"
            class="bd-ball"
            :class="{ sel: s.sel === i, heavy: s.revealed && i === s.heavy }"
            :aria-pressed="s.sel === i"
            :aria-label="`Ball ${i + 1}, on ${placeName[z.where]}${s.sel === i ? ', picked up' : ''}`"
            @click="pick(i)"
          >
            {{ i + 1 }}
          </button>
        </div>
        <div v-if="panLabel(z.where)" class="bd-tilt">
          {{ panLabel(z.where) }}
        </div>
      </div>
    </div>

    <div class="bd-bar">
      <button type="button" class="primary" :disabled="!canWeigh" @click="weigh">
        Weigh
      </button>
      <button type="button" @click="clearPans">
        Clear pans
      </button>
      <button type="button" @click="s.revealed = !s.revealed">
        {{ s.revealed ? 'Hide answer' : 'Reveal answer' }}
      </button>
      <button type="button" @click="restart">
        New puzzle
      </button>
      <span class="bd-count">Weighings used: <b>{{ s.weighings }}</b></span>
    </div>

    <div class="bd-panel" aria-live="polite">
      <ol v-if="s.log.length" class="bd-log">
        <li v-for="(line, k) in s.log.slice(-3)" :key="s.log.length - 3 + k">
          Weighing {{ Math.max(1, s.log.length - 2) + k }}: {{ line }}
        </li>
      </ol>
      <div v-if="s.revealed" class="bd-answer">
        The heavy ball is ball {{ s.heavy + 1 }}.
      </div>
      <div class="bd-status">
        {{ status }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bd-zones {
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  gap: 12px;
  align-items: start;
}
.bd-zone {
  position: relative;
  min-height: 142px;
  padding: 6px 10px 10px;
  border-radius: 14px;
  border: 2px dashed var(--c-line, #94a3b8);
  background: var(--c-paper, #fff);
  transition: transform 0.25s ease;
}
.bd-zone.pan {
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
}
.bd-zone.target {
  cursor: pointer;
  outline: 3px dashed var(--c-accent-2, #c2410c);
  outline-offset: 3px;
}
.bd-zone.down {
  transform: translateY(14px);
}
.bd-zone.up {
  transform: translateY(-6px);
}
.bd-title {
  display: block;
  width: 100%;
  margin-bottom: 6px;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: var(--c-ink, #0f172a);
  cursor: pointer;
}
.bd-title:disabled {
  cursor: default;
}
.bd-here {
  color: var(--c-accent-2, #c2410c);
}
.bd-balls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  min-height: 56px;
}
.bd-ball {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid #7f1d1d;
  background: #dc2626;
  color: #ffffff;
  font: inherit;
  font-size: 21px;
  font-weight: 700;
  cursor: pointer;
}
.bd-ball.sel {
  outline: 4px solid var(--c-accent-2, #c2410c);
  outline-offset: 3px;
  transform: translateY(-4px);
}
.bd-ball.heavy {
  border: 5px solid var(--c-ink, #0f172a);
  box-shadow: 0 0 0 4px #fde047;
}
.bd-tilt {
  margin-top: 6px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: var(--c-accent-2, #c2410c);
}
.bd-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}
.bd-bar button {
  font: inherit;
  font-size: 18px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.bd-bar button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.bd-bar button:disabled {
  opacity: 0.45;
  cursor: default;
}
.bd-count {
  margin-left: auto;
  font-size: 20px;
}
.bd-panel {
  font-size: 18px;
  line-height: 1.35;
  padding: 6px 14px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
.bd-panel .bd-log {
  margin: 0 !important;
  padding: 0 !important;
  list-style: none;
}
.bd-log li {
  margin: 0;
}
.bd-answer {
  font-weight: 700;
  color: var(--c-accent-2, #c2410c);
}
.bd-status {
  color: var(--c-muted, #475569);
}
</style>
