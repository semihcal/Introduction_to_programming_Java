<!-- Source credit, shown in the bottom-left corner of the slide it is placed
     on. It matches the "COMP 1600 · n / N" footer in the opposite corner. -->
<template>
  <div class="deck-credit">
    <slot>This slide is prepared from Dr. Barry Wittman's notes</slot>
  </div>
</template>

<style scoped>
.deck-credit {
  position: absolute;
  left: 20px;
  bottom: 12px;
  font-size: 18px;
  line-height: 1.5;
  color: #475569;
}
</style>
