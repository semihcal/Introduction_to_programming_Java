<!-- Slide number and progress bar on every slide except the cover. -->
<template>
  <div v-if="$nav.currentLayout !== 'cover'" class="deck-footer">
    <div class="track">
      <div class="fill" :style="{ width: `${($nav.currentPage / $nav.total) * 100}%` }" />
    </div>
    <span class="count">COMP 1600 · {{ $nav.currentPage }} / {{ $nav.total }}</span>
  </div>
</template>

<style scoped>
.deck-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
.track {
  height: 5px;
  background: #cbd5e1;
}
.fill {
  height: 100%;
  background: #3730a3;
  transition: width 0.3s ease;
}
.count {
  position: absolute;
  right: 20px;
  bottom: 12px;
  font-size: 18px;
  color: #475569;
  font-variant-numeric: tabular-nums;
}
</style>
