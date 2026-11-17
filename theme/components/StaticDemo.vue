<script setup lang="ts">
// The Item class from the lecture: `count` is static (one copy, stored with
// the class) and `name` is a normal member (one copy per object).
import { useSyncedState } from '../composables/useSyncedState'

const names = ['Sword', 'Shield', 'Potion', 'Map', 'Lantern', 'Rope']

const s = useSyncedState('static-item', {
  items: [] as string[],
  out: 'No Item objects yet. Item.getItemsInUniverse() returns 0.',
})

function create() {
  if (s.items.length >= names.length)
    return
  const name = names[s.items.length]
  s.items.push(name)
  s.out = `new Item("${name}") ran the constructor: name = "${name}" in the new object, and ++count in the class.`
}
function ask() {
  s.out = `Item.getItemsInUniverse() returns ${s.items.length}. It is a static method, called on the class itself.`
}
function reset() {
  s.items = []
  s.out = 'No Item objects yet. Item.getItemsInUniverse() returns 0.'
}
</script>

<template>
  <div class="sd" @keydown.stop>
    <div class="sd-buttons">
      <button type="button" class="primary" :disabled="s.items.length >= names.length" @click="create">
        new Item(...)
      </button>
      <button type="button" @click="ask">
        Item.getItemsInUniverse()
      </button>
      <button type="button" class="ghost" @click="reset">
        Reset
      </button>
    </div>

    <div class="sd-main">
      <div class="sd-class" role="img" :aria-label="`The Item class holds one static member, count, which is ${s.items.length}.`">
        <div class="sd-title">
          Item class
        </div>
        <div class="sd-cap">
          static: one copy in total
        </div>
        <div class="sd-count">
          <span>count</span><b>{{ s.items.length }}</b>
        </div>
      </div>

      <div class="sd-objects" role="img" :aria-label="s.items.length ? `${s.items.length} Item objects, each with its own name: ${s.items.join(', ')}.` : 'No Item objects yet.'">
        <div class="sd-cap">
          Item objects: one <code>name</code> each
        </div>
        <div class="sd-list">
          <div v-for="(name, i) in s.items" :key="i" class="sd-obj">
            <span>name</span><b>"{{ name }}"</b>
          </div>
          <div v-if="s.items.length === 0" class="sd-empty">
            none yet
          </div>
        </div>
      </div>
    </div>

    <div class="sd-out" aria-live="polite">
      {{ s.out }}
    </div>
  </div>
</template>

<style scoped>
.sd {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sd-buttons {
  display: flex;
  gap: 8px;
}
.sd-buttons button {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 10px;
  border: 2px solid var(--c-accent, #3730a3);
  background: var(--c-paper, #fff);
  color: var(--c-accent, #3730a3);
  cursor: pointer;
}
.sd-buttons button.primary {
  background: var(--c-accent, #3730a3);
  color: var(--c-on-accent, #fff);
}
.sd-buttons button.ghost {
  font-family: inherit;
}
.sd-buttons button:disabled {
  opacity: 0.45;
  cursor: default;
}
.sd-main {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  align-items: stretch;
}
.sd-class {
  padding: 12px 16px;
  border-radius: 16px;
  border: 3px solid var(--c-accent, #3730a3);
  background: var(--c-accent-soft, #eef2ff);
}
.sd-title {
  font-size: 22px;
  font-weight: 700;
}
.sd-cap {
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.sd-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 8px 16px;
  border-radius: 12px;
  border: 3px solid var(--c-accent, #3730a3);
  background: #ffffff;
  font-family: var(--slidev-font-mono, monospace);
  font-size: 22px;
}
.sd-count b {
  font-size: 36px;
  font-variant-numeric: tabular-nums;
}
.sd-objects {
  padding: 12px 16px;
  border-radius: 16px;
  border: 2px dashed var(--c-line, #94a3b8);
  background: var(--c-paper, #fff);
  min-height: 150px;
}
.sd-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 8px;
}
.sd-obj {
  display: flex;
  flex-direction: column;
  padding: 4px 12px 6px;
  border-radius: 10px;
  border: 3px solid var(--c-accent-2, #c2410c);
  background: var(--c-accent-2-soft, #fff7ed);
  font-family: var(--slidev-font-mono, monospace);
  font-size: 18px;
  line-height: 1.3;
}
.sd-empty {
  font-size: 18px;
  color: var(--c-muted, #475569);
}
.sd-out {
  font-size: 20px;
  line-height: 1.4;
  min-height: 60px;
  padding: 8px 16px;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  background: var(--c-paper, #fff);
}
</style>
