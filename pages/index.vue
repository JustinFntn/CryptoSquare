<template>
  <div class="min-h-screen pt-32 bg-gradient-to-t from-primary-400/30 via-transparent to-transparent w-full">
    <h1 class="text-4xl font-semibold text-center">
      <span class="text-primary-400">Decrypt</span>, learn,
      <span class="relative">
        <span class="z-50">master</span>
        <span class="absolute inset-x-0 bottom-0 h-5 bg-primary-400/20 z-0" aria-hidden="true"></span>
      </span>
    </h1>
    <p class="text-center text-neutral-400 mt-4">
      Learn to be the best you can be through cryptography tests. Be the best among other users
    </p>
    <div class="flex justify-center mt-6">
      <SignedOut>
        <UButton label="Start the adventure" variant="outline" @click="signIn()" />
      </SignedOut>
      <SignedIn>
        <UButton label="Start the adventure" variant="outline" to="/dashboard" />
      </SignedIn>
    </div>
  </div>
  <div class="flex justify-center mt-[-300px]">
    <img src="/img/image.png" class="rounded w-[1000px] border border-primary-800" alt="" />
    <!-- TODO : Remplacer par une image de l'interface-->
  </div>
  <SignInButton ref="signInButton" class="hidden" mode="modal" />
</template>

<script setup>
import { ref } from 'vue'

const signInButton = ref(null)

const signIn = () => {
  signInButton.value.$el.click()
}
useHead({
  title: 'Welcome to Crypto Square'
})
</script>
