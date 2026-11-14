<script setup lang="ts">
// A countdown for in-class work time. The end time is shared, so every
// open window shows the same clock.
import { computed, onScopeDispose, ref } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const props = withDefaults(defineProps<{ minutes?: number }>(), { minutes: 20 })

// While running, `endsAt` is the clock time when the countdown reaches zero.
// While paused, `left` is the number of milliseconds remaining.
const timer = useSyncedState('worktimer', {
  running: false,
  endsAt: 0,
  left: props.minutes * 60_000,
}, { persist: true })

const now = ref(Date.now())
const tick = setInterval(() => {
  now.value = Date.now()
}, 250)
onScopeDispose(() => clearInterval(tick))

const remaining = computed(() =>
  timer.running ? Math.max(timer.endsAt - now.value, 0) : timer.left)
const done = computed(() => remaining.value <= 0)

const clock = computed(() => {
  const total = Math.ceil(remaining.value / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
})
const spoken = computed(() => {
  if (done.value)
    return 'Time is up.'
  return timer.running ? 'Timer running.' : 'Timer paused.'
})

function start() {
  if (done.value)
    return
  timer.endsAt = Date.now() + timer.left
  timer.running = true
}
function pause() {
  timer.left = Math.max(timer.endsAt - Date.now(), 0)
  timer.running = false
}
function add(minutes: number) {
  const next = Math.max(remaining.value + minutes * 60_000, 0)
  timer.left = next
  if (timer.running)
    timer.endsAt = Date.now() + next
}
function reset() {
  timer.running = false
  timer.left = props.minutes * 60_000
}
</script>

<template>
  <div class="worktimer" :class="{ done }" @keydown.stop>
    <div class="clock" role="timer" :aria-label="`${clock} remaining`">
      {{ done ? 'Time is up' : clock }}
    </div>
    <div class="buttons">
      <button type="button" class="primary" :disabled="done" @click="timer.running ? pause() : start()">
        {{ timer.running ? 'Pause' : 'Start' }}
      </button>
      <button type="button" aria-label="Remove one minute" @click="add(-1)">
        −1 min
      </button>
      <button type="button" aria-label="Add one minute" @click="add(1)">
        +1 min
      </button>
      <button type="button" aria-label="Add five minutes" @click="add(5)">
        +5 min
      </button>
      <button type="button" @click="reset">
        Reset
      </button>
    </div>
    <div class="spoken" aria-live="polite">
      {{ spoken }}
    </div>
  </div>
</template>

<style scoped>
.worktimer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 16px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
}
.worktimer.done {
  border-color: var(--c-accent-2, #c2410c);
  border-style: dashed;
}
.clock {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 68px;
  font-weight: 700;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  color: var(--c-ink, #0f172a);
  white-space: nowrap;
}
.worktimer.done .clock {
  font-family: inherit;
  font-size: 44px;
  color: var(--c-accent-2, #c2410c);
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.buttons button {
  font: inherit;
  font-size: 18px;
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.buttons button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  min-width: 84px;
}
.buttons button:disabled {
  opacity: 0.45;
  cursor: default;
}
.spoken {
  font-size: 18px;
  color: var(--c-muted, #475569);
}
</style>
