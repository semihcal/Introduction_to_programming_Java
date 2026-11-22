<script setup lang="ts">
// Clicker-style multiple choice. Feedback is given in words and symbols,
// not color alone.
import { useSyncedState } from '../composables/useSyncedState'

const props = defineProps<{
  options: string[]
  answer: number
  explain?: string
}>()

const quiz = useSyncedState('quiz', { picked: null as number | null })
const letters = 'ABCDEF'
</script>

<template>
  <div class="quiz" @keydown.stop>
    <div class="options">
      <button
        v-for="(opt, i) in props.options"
        :key="i"
        type="button"
        class="opt"
        :class="{ right: quiz.picked === i && i === props.answer, wrong: quiz.picked === i && i !== props.answer }"
        @click="quiz.picked = i"
      >
        <span class="letter">{{ letters[i] }}</span>
        <span class="text">{{ opt }}</span>
        <span v-if="quiz.picked === i" class="mark">{{ i === props.answer ? '✓ Correct' : '✗ Not quite' }}</span>
      </button>
    </div>
    <div class="feedback" aria-live="polite">
      <template v-if="quiz.picked === props.answer && props.explain">
        {{ props.explain }}
      </template>
      <template v-else-if="quiz.picked !== null && quiz.picked !== props.answer">
        Try another answer.
      </template>
    </div>
  </div>
</template>

<style scoped>
.quiz {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 14px;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 12px;
  background: var(--c-paper, #fff);
  color: var(--c-ink, #0f172a);
  font: inherit;
  font-size: 22px;
  text-align: left;
  cursor: pointer;
}
.letter {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
  font-size: 18px;
  font-weight: 700;
  flex: none;
}
.text {
  flex: 1;
  font-family: var(--slidev-font-mono, monospace);
  /* An option may be several lines of program output. */
  white-space: pre-line;
}
.mark {
  font-size: 18px;
  font-weight: 700;
}
.opt.right {
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
}
.opt.wrong {
  border: 3px dashed var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.feedback {
  min-height: 56px;
  font-size: 20px;
  line-height: 1.35;
}
</style>
