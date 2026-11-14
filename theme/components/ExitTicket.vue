<script setup lang="ts">
// The exit-ticket QR code, shared by every deck. The image lives once in the
// project-root public/ folder. Importing it here (instead of writing an <img>
// path in each slides.md) makes it work both with `npm run dev` and in the
// built site.
const qr = Object.values(import.meta.glob('../../public/exit-ticket.png', {
  eager: true,
  query: '?url',
  import: 'default',
}))[0] as string | undefined
</script>

<template>
  <img v-if="qr" :src="qr" class="qr mx-auto" alt="QR code that opens today's exit ticket form.">
  <p v-else class="small">
    Missing image: add public/exit-ticket.png to the project.
  </p>
</template>
