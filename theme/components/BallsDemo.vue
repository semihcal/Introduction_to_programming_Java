<script setup lang="ts">
// The nine-ball puzzle: one ball is slightly heavier. Put balls on the two
// pans of a balance and weigh, using as few weighings as possible.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const BENCH = 0
const LEFT = 1
const RIGHT = 2

function fresh() {
  return {
    heavy: Math.floor(Math.random() * 9),
    side: Array.from({ length: 9 }, () => BENCH),
    weighings: 0,
    log: [] as string[],
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
const hint = computed(() => {
  if (left.value.length === 0 && right.value.length === 0)
    return 'Click a ball to move it: table → left pan → right pan → table.'
  if (!canWeigh.value)
    return 'Put the same number of balls on each pan before weighing.'
  return `Ready to weigh ${left.value.length} against ${right.value.length}.`
})

function move(i: number) {
  s.side[i] = (s.side[i] + 1) % 3
}
function weigh() {
  if (!canWeigh.value)
    return
  s.weighings++
  let outcome = 'the pans balance'
  if (left.value.includes(s.heavy))
    outcome = 'the left pan is heavier'
  else if (right.value.includes(s.heavy))
    outcome = 'the right pan is heavier'
  s.log.push(`Weighing ${s.weighings}: ${names(left.value)} against ${names(right.value)}: ${outcome}.`)
}
function clearPans() {
  s.side = s.side.map(() => BENCH)
}
function restart() {
  Object.assign(s, fresh())
}
</script>

<template>
  <div class="bd" @keydown.stop>
    <div class="bd-zones">
      <div class="bd-zone pan">
        <div class="bd-title">
          Left pan
        </div>
        <div class="bd-balls">
          <button v-for="i in left" :key="i" type="button" class="bd-ball" :class="{ heavy: s.revealed && i === s.heavy }" :aria-label="`Ball ${i + 1}, on the left pan`" @click="move(i)">
            {{ i + 1 }}
          </button>
        </div>
      </div>
      <div class="bd-zone">
        <div class="bd-title">
          On the table
        </div>
        <div class="bd-balls">
          <button v-for="i in bench" :key="i" type="button" class="bd-ball" :class="{ heavy: s.revealed && i === s.heavy }" :aria-label="`Ball ${i + 1}, on the table`" @click="move(i)">
            {{ i + 1 }}
          </button>
        </div>
      </div>
      <div class="bd-zone pan">
        <div class="bd-title">
          Right pan
        </div>
        <div class="bd-balls">
          <button v-for="i in right" :key="i" type="button" class="bd-ball" :class="{ heavy: s.revealed && i === s.heavy }" :aria-label="`Ball ${i + 1}, on the right pan`" @click="move(i)">
            {{ i + 1 }}
          </button>
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

    <div class="bd-log" aria-live="polite">
      <div v-if="s.revealed" class="bd-answer">
        The heavy ball is ball {{ s.heavy + 1 }}.
      </div>
      <div v-for="(line, k) in s.log.slice(-2)" :key="k">
        {{ line }}
      </div>
      <div v-if="s.log.length === 0 || !canWeigh" class="bd-hint">
        {{ hint }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bd-zones {
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  gap: 12px;
}
.bd-zone {
  min-height: 150px;
  padding: 8px 10px;
  border-radius: 14px;
  border: 2px dashed var(--c-line, #94a3b8);
  background: var(--c-paper, #fff);
}
.bd-zone.pan {
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
}
.bd-title {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 6px;
}
.bd-balls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.bd-ball {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #7f1d1d;
  background: #dc2626;
  color: #ffffff;
  font: inherit;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
}
.bd-ball.heavy {
  border: 5px solid var(--c-ink, #0f172a);
  box-shadow: 0 0 0 4px #fde047;
}
.bd-bar {
  display: flex;
  align-items: center;
  gap: 8px;
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
.bd-log {
  font-size: 19px;
  line-height: 1.4;
  min-height: 84px;
}
.bd-hint {
  color: var(--c-muted, #475569);
}
.bd-answer {
  font-weight: 700;
  color: var(--c-accent-2, #c2410c);
}
</style>
