<script setup lang="ts">
// Simulates the lecture's two programs: one writes 10 numbers to
// numbers.txt, the other reads them back, sorts them and prints them.
// A switch shows what can happen when close() is forgotten.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

function randomNumbers() {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 99) + 1)
}

const s = useSyncedState('filedemo', {
  input: randomNumbers(),
  close: true,
  file: null as number[] | null, // null: numbers.txt does not exist yet
  output: '' as string,
  status: 'numbers.txt does not exist yet. Run the writer first.',
}, { shareInitial: true })

const fileText = computed(() => {
  if (s.file === null)
    return '(no file)'
  return s.file.length ? s.file.join('\n') : '(empty file)'
})

function runWriter() {
  if (s.close) {
    s.file = [...s.input]
    s.status = 'Writer: wrote 10 numbers and closed the file.'
  }
  else {
    s.file = []
    s.status = 'Writer: close() was never called, so the numbers may not reach the file. Here, none did.'
  }
  s.output = ''
}
function runReader() {
  if (s.file === null) {
    s.output = 'FileNotFoundException: numbers.txt'
    s.status = 'Reader: the file does not exist, so new Scanner(new File(...)) throws an exception.'
    return
  }
  if (s.file.length === 0) {
    s.output = 'NoSuchElementException'
    s.status = 'Reader: the file is empty, so nextInt() has nothing to read.'
    return
  }
  s.output = [...s.file].sort((a, b) => a - b).join(' ')
  s.status = 'Reader: read 10 numbers, sorted them, and printed them in order.'
}
function newNumbers() {
  s.input = randomNumbers()
}
function deleteFile() {
  s.file = null
  s.output = ''
  s.status = 'numbers.txt deleted.'
}
</script>

<template>
  <div class="fd" @keydown.stop>
    <div class="fd-cols">
      <div class="fd-box">
        <div class="fd-title">
          1 · Writer program
        </div>
        <div class="fd-small">
          The user types:
        </div>
        <div class="fd-mono">
          {{ s.input.join(' ') }}
        </div>
        <label class="fd-check">
          <input v-model="s.close" type="checkbox">
          call <code>out.close()</code>
        </label>
        <div class="fd-buttons">
          <button type="button" class="primary" @click="runWriter">
            Run writer
          </button>
          <button type="button" @click="newNumbers">
            New numbers
          </button>
        </div>
      </div>

      <div class="fd-box file">
        <div class="fd-title">
          numbers.txt
        </div>
        <pre class="fd-file">{{ fileText }}</pre>
        <div class="fd-buttons">
          <button type="button" @click="deleteFile">
            Delete file
          </button>
        </div>
      </div>

      <div class="fd-box">
        <div class="fd-title">
          2 · Reader program
        </div>
        <div class="fd-small">
          Reads, sorts, prints:
        </div>
        <div class="fd-mono out" :class="{ bad: s.output.includes('Exception') }">
          {{ s.output || '(not run yet)' }}
        </div>
        <div class="fd-buttons">
          <button type="button" class="primary" @click="runReader">
            Run reader
          </button>
        </div>
      </div>
    </div>
    <div class="fd-status" aria-live="polite">
      {{ s.status }}
    </div>
  </div>
</template>

<style scoped>
.fd {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fd-cols {
  display: grid;
  grid-template-columns: 1.25fr 0.8fr 1.25fr;
  gap: 12px;
  align-items: stretch;
}
.fd-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 14px 12px;
  border-radius: 14px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
}
.fd-box.file {
  border-color: var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.fd-title {
  font-size: 20px;
  font-weight: 700;
}
.fd-small {
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.fd-mono {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 19px;
  font-weight: 700;
  line-height: 1.4;
  min-height: 54px;
}
.fd-mono.bad {
  color: var(--c-accent-2, #c2410c);
}
.fd-file {
  flex: 1;
  margin: 0;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.12;
  min-height: 204px;
}
.fd-check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 19px;
}
.fd-check input {
  width: 22px;
  height: 22px;
  accent-color: var(--c-accent, #3730a3);
}
.fd-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}
.fd-buttons button {
  font: inherit;
  font-size: 18px;
  font-weight: 600;
  padding: 3px 14px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.fd-buttons button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.fd-status {
  font-size: 19px;
  line-height: 1.35;
  min-height: 52px;
}
</style>
