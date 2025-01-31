<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <SignIn force-redirect-url="/dashboard" />
    <!-- <p>{{ useColorMode().value === 'dark' }}</p> -->
  </div>
</template>

<script setup>
useHead({
  title: 'test'
})
</script>
