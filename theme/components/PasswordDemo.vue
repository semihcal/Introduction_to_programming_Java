<script setup lang="ts">
// Type a guess for the secret password. The demo shows
// guess.equals("eggplant") and what the program prints.
import { computed } from 'vue'
import { useSyncedState } from '../composables/useSyncedState'

const s = useSyncedState('passworddemo', { guess: '' })
const same = computed(() => s.guess === 'eggplant')
</script>

<template>
  <div class="pw" @keydown.stop>
    <div class="pw-left">
    <label class="pw-in">
      <span>Type a guess:</span>
      <input v-model="s.guess" type="text" maxlength="20" spellcheck="false" autocomplete="off" aria-label="Password guess">
    </label>
    <div class="pw-eq" aria-live="polite">
      <code>"{{ s.guess }}".equals("eggplant")</code> is <b :class="{ t: same }">{{ same }}</b>
    </div>
    </div>
    <div class="pw-con">
      <div class="pw-h">
        Console
      </div>
      <div>What is the secret password? <span class="pw-u">{{ s.guess }}</span></div>
      <div v-if="same">
        Congratulations! You know the password.
      </div>
    </div>
  </div>
</template>

<style scoped>
.pw {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: start;
}
.pw-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pw-in {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
}
.pw-in input {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
  padding: 4px 10px;
  width: 220px;
  border: 2px solid var(--c-accent, #3730a3);
  border-radius: 8px;
}
.pw-eq {
  font-size: 20px;
}
.pw-eq b {
  font-family: var(--slidev-font-mono, monospace);
  padding: 1px 8px;
  border-radius: 6px;
  border: 2px dashed #b91c1c;
}
.pw-eq b.t {
  border: 2px solid #15803d;
}
.pw-con {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 20px;
  line-height: 1.6;
  padding: 10px 16px;
  border-radius: 12px;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 110px;
}
.pw-h {
  font-size: 18px;
  color: #94a3b8;
}
.pw-u {
  color: #fdba74;
}
</style>
