<script setup lang="ts">
// The if-statement from the slides with a slider for x. The condition is
// evaluated, the body is marked as run or skipped, and the console shows
// what the program prints.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('ifdemo', { x: 4 })
const cond = computed(() => s.x < 5)
</script>

<template>
  <div class="id" @keydown.stop>
    <label class="id-slider">
      <code>int x = {{ s.x }};</code>
      <input v-model.number="s.x" type="range" min="0" max="10" step="1" aria-label="Value of x">
    </label>
    <div class="id-cols">
      <div class="id-code">
        <div>int x = {{ s.x }};</div>
        <div>if (<span class="id-cond">x &lt; 5</span>) { <span class="id-tag" :class="{ t: cond }">{{ s.x }} &lt; 5 is {{ cond }}</span></div>
        <div class="id-body" :class="{ run: cond }">
          &nbsp;&nbsp;System.out.println("x is small!");
          <span class="id-mark">{{ cond ? '← runs' : '← skipped' }}</span>
        </div>
        <div>}</div>
        <div>System.out.println("done");</div>
      </div>
      <div class="id-con" aria-live="polite">
        <div class="id-h">
          Console
        </div>
        <div v-if="cond">
          x is small!
        </div>
        <div>done</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.id {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.id-slider {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
}
.id-slider input {
  flex: 1;
  accent-color: var(--c-accent, #3730a3);
}
.id-cols {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 16px;
}
.id-code {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  line-height: 1.8;
  padding: 10px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: var(--c-paper, #fff);
}
.id-cond {
  font-weight: 700;
  color: var(--c-accent, #3730a3);
}
.id-tag {
  font-size: 18px;
  margin-left: 8px;
  padding: 1px 8px;
  border-radius: 6px;
  border: 2px dashed #b91c1c;
}
.id-tag.t {
  border: 2px solid #15803d;
}
.id-body {
  color: var(--c-muted, #475569);
  text-decoration: line-through;
}
.id-body.run {
  color: var(--c-ink, #0f172a);
  text-decoration: none;
  font-weight: 700;
}
.id-mark {
  font-size: 18px;
  margin-left: 6px;
  text-decoration: none;
  display: inline-block;
}
.id-con {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  line-height: 1.6;
  padding: 10px 16px;
  border-radius: 12px;
  background: #0f172a;
  color: #e2e8f0;
}
.id-h {
  font-size: 18px;
  color: #94a3b8;
  margin-bottom: 4px;
}
</style>
