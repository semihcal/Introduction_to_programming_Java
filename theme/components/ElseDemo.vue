<script setup lang="ts">
// The bank-balance if-else: a slider sets balance, the branch that runs is
// marked and the other is crossed out, and the console shows the output.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('elsedemo', { balance: 25 })
const debt = computed(() => s.balance < 0)
</script>

<template>
  <div class="br" @keydown.stop>
    <label class="br-slider">
      <code>balance = {{ s.balance }}</code>
      <input v-model.number="s.balance" type="range" min="-50" max="50" step="5" aria-label="Balance">
    </label>
    <div class="br-cols">
      <div class="br-code">
        <div>if (<b>balance &lt; 0</b>) { <span class="br-tag" :class="{ t: debt }">{{ s.balance }} &lt; 0 is {{ debt }}</span></div>
        <div class="br-line" :class="{ run: debt }">
          &nbsp;&nbsp;System.out.println("You are in debt!");
        </div>
        <div>}</div>
        <div>else {</div>
        <div class="br-line" :class="{ run: !debt }">
          &nbsp;&nbsp;System.out.println("You have $" + balance);
        </div>
        <div>}</div>
      </div>
      <div class="br-con" aria-live="polite">
        <div class="br-h">
          Console
        </div>
        <div>{{ debt ? 'You are in debt!' : `You have $${s.balance}` }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.br { display: flex; flex-direction: column; gap: 12px; }
.br-slider { display: flex; align-items: center; gap: 16px; font-size: 20px; }
.br-slider input { flex: 1; accent-color: var(--c-accent, #3730a3); }
.br-cols { display: grid; grid-template-columns: 1.7fr 1fr; gap: 14px; }
.br-code { font-family: var(--slidev-font-mono, monospace); font-size: 19px; line-height: 1.75; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 10px; background: var(--c-paper, #fff); }
.br-code b { color: var(--c-accent, #3730a3); }
.br-tag { font-size: 18px; margin-left: 6px; padding: 0 8px; border-radius: 6px; border: 2px dashed #b91c1c; }
.br-tag.t { border: 2px solid #15803d; }
.br-line { color: var(--c-muted, #475569); text-decoration: line-through; }
.br-line.run { color: var(--c-ink, #0f172a); text-decoration: none; font-weight: 700; background: var(--c-accent-2-soft, #fff7ed); border-radius: 6px; }
.br-con { font-family: var(--slidev-font-mono, monospace); font-size: 20px; line-height: 1.6; padding: 10px 14px; border-radius: 12px; background: #0f172a; color: #e2e8f0; }
.br-h { font-size: 18px; color: #94a3b8; }
</style>
