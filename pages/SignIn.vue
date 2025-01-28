<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <SignIn :appearance="{
      elements: {
        'formFieldInput__identifier': 'bg-red-500 text-2xl',
        formButtonPrimary: 'bg-primary-800 hover:bg-primary-900 text-sm',
      }
    }" />
  </div>
</template>

<script setup>
</script>