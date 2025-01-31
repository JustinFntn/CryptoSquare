<template>
  <div class="flex flex-col h-screen items-center justify-center">
    <h1 class="text-center text-4xl font-bold text-primary-400">
      Welcome to Crypto Squad
    </h1>
    <p class="text-center text-neutral-500  ">
      A collaborative e-platform that lets you design, create and solve cryptographic puzzles on your own or as part of
      a team.
    </p>
    <div class="flex gap-3 my-4">
      <UButton label="Start the tutoriel" icon="i-lucide-send" to="/dashboard/help" />
      <UButton label="Go back" icon="i-lucide-undo-2" color="red" variant="ghost" to="/dashboard" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'help'
})
</script>
