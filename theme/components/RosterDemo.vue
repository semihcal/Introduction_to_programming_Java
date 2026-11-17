<script setup lang="ts">
// A roster: an array of Student objects. The buttons run the three
// operations from the lecture over the array.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const students = [
  { first: 'Ada', last: 'Okafor', gpa: 3.6, id: 1001 },
  { first: 'Ben', last: 'Tran', gpa: 2.9, id: 1002 },
  { first: 'Cara', last: 'Diaz', gpa: 3.9, id: 1003 },
  { first: 'Dev', last: 'Patel', gpa: 3.2, id: 1004 },
  { first: 'Elif', last: 'Kaya', gpa: 3.4, id: 1005 },
]

const s = useSyncedState('roster', { op: 'print' as 'print' | 'average' | 'best' })

const average = computed(() => students.reduce((sum, st) => sum + st.gpa, 0) / students.length)
const bestIndex = computed(() => students.reduce((best, st, i) => st.gpa > students[best].gpa ? i : best, 0))

const result = computed(() => {
  if (s.op === 'average') {
    const sum = students.map(st => st.gpa.toFixed(1)).join(' + ')
    return `Average GPA: (${sum}) ÷ ${students.length} = ${average.value.toFixed(2)}. The loop calls getGPA() on every Student.`
  }
  if (s.op === 'best') {
    const b = students[bestIndex.value]
    return `Valedictorian: ${b.first} ${b.last}, GPA ${b.gpa.toFixed(1)}. The loop keeps the Student with the highest getGPA() so far.`
  }
  return 'Printed the roster: one line per Student, built from its accessors.'
})
</script>

<template>
  <div class="rd" @keydown.stop>
    <div class="rd-buttons">
      <button type="button" :class="{ on: s.op === 'print' }" :aria-pressed="s.op === 'print'" @click="s.op = 'print'">
        Print roster
      </button>
      <button type="button" :class="{ on: s.op === 'average' }" :aria-pressed="s.op === 'average'" @click="s.op = 'average'">
        Average GPA
      </button>
      <button type="button" :class="{ on: s.op === 'best' }" :aria-pressed="s.op === 'best'" @click="s.op = 'best'">
        Valedictorian
      </button>
    </div>

    <table class="rd-table">
      <thead>
        <tr>
          <th>Index</th>
          <th>First name</th>
          <th>Last name</th>
          <th class="num">
            GPA
          </th>
          <th class="num">
            ID
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(st, i) in students" :key="st.id" :class="{ best: s.op === 'best' && i === bestIndex }">
          <td class="mono">
            roster[{{ i }}]
          </td>
          <td>{{ st.first }}</td>
          <td>{{ st.last }}</td>
          <td class="num" :class="{ used: s.op !== 'print' }">
            {{ st.gpa.toFixed(1) }}
          </td>
          <td class="num">
            {{ st.id }}
          </td>
          <td class="flag">
            {{ s.op === 'best' && i === bestIndex ? '← highest GPA' : '' }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="rd-result" aria-live="polite">
      {{ result }}
    </div>
  </div>
</template>

<style scoped>
.rd {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rd-buttons {
  display: flex;
  gap: 8px;
}
.rd-buttons button {
  font: inherit;
  font-size: 19px;
  font-weight: 600;
  padding: 4px 16px;
  border-radius: 999px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.rd-buttons button.on {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.rd-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 20px !important;
}
.rd-table th,
.rd-table td {
  padding: 3px 12px 3px 6px !important;
  text-align: left;
  white-space: nowrap;
}
.mono,
.num {
  font-family: var(--slidev-font-mono, monospace);
  font-variant-numeric: tabular-nums;
}
.num {
  text-align: right !important;
}
td.used {
  font-weight: 700;
  background: var(--c-accent-soft, #eef2ff);
}
tr.best td {
  font-weight: 700;
  border-top: 3px solid var(--c-accent-2, #c2410c);
  border-bottom: 3px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
}
.flag {
  font-size: 18px;
  font-weight: 700;
  color: var(--c-accent-2, #c2410c);
  width: 150px;
}
.rd-result {
  font-size: 20px;
  line-height: 1.4;
  min-height: 60px;
  padding: 8px 16px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
</style>
