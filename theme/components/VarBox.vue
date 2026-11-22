<script setup lang="ts">
// A variable drawn as a labeled box. Before assignment the box is empty; with
// `filled` the value arrives from the right along a left-pointing arrow, the
// way `name = value;` reads. Drive `filled` from the slide, for example
// :filled="$clicks >= 1". No state of its own, so nothing to sync.
withDefaults(defineProps<{
  type: string
  name: string
  value: string
  bits?: string
  filled?: boolean
  object?: boolean
}>(), {
  bits: '',
  filled: false,
  object: false,
})
</script>

<template>
  <div class="vb" :class="{ obj: object }">
    <div class="vb-type">
      holds only <b>{{ type }}</b> values<span v-if="bits"> · {{ bits }}</span>
    </div>
    <div class="vb-row">
      <div class="vb-col">
        <div class="vb-box" :class="{ empty: !filled }">
          <span v-if="filled" class="vb-val">{{ value }}</span>
          <span v-else class="vb-none">empty</span>
        </div>
        <div class="vb-name">
          {{ name }}
        </div>
      </div>
      <div class="vb-in" :class="{ show: filled }" aria-hidden="true">
        <span class="vb-arrow" />
        <span class="vb-chip">{{ value }}</span>
      </div>
    </div>
    <p class="sr-only" aria-live="polite">
      {{ filled ? `${name} holds ${value}` : `${name} is an empty box for ${type} values` }}
    </p>
  </div>
</template>

<style scoped>
.vb {
  --vb-c: var(--c-accent, #3730a3);
  --vb-soft: var(--c-accent-soft, #eef2ff);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.vb.obj {
  --vb-c: var(--c-accent-2, #c2410c);
  --vb-soft: var(--c-accent-2-soft, #fff7ed);
}
.vb-type {
  font-size: 20px;
  color: var(--c-muted, #475569);
}
.vb-type b {
  font-family: var(--slidev-font-mono, monospace);
  color: var(--vb-c);
}
.vb-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.vb-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.vb-box {
  min-width: 170px;
  height: 84px;
  padding: 0 16px;
  display: grid;
  place-items: center;
  border: 3px solid var(--vb-c);
  border-radius: 12px;
  background: var(--vb-soft);
  transition: background 0.3s;
}
.vb-box.empty {
  border-style: dashed;
  background: var(--c-paper, #fff);
}
.vb-val {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 30px;
  font-weight: 700;
  white-space: nowrap;
}
.vb-none {
  font-size: 20px;
  color: var(--c-muted, #475569);
  font-style: italic;
}
.vb-name {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 24px;
  font-weight: 700;
  color: var(--vb-c);
}
.vb-in {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 84px;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.4s, transform 0.4s;
}
.vb-in.show {
  opacity: 1;
  transform: none;
}
.vb-arrow {
  position: relative;
  width: 56px;
  height: 4px;
  background: var(--vb-c);
}
.vb-arrow::before {
  content: '';
  position: absolute;
  left: -12px;
  top: -8px;
  border-right: 14px solid var(--vb-c);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}
.vb-chip {
  font-family: var(--slidev-font-mono, monospace);
  font-size: 24px;
  font-weight: 700;
  padding: 6px 12px;
  border: 2px solid var(--c-line, #94a3b8);
  border-radius: 10px;
  white-space: nowrap;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
