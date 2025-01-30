<template>
  <UContainer class="py-7 max-w-5xl mx-auto">
    <h1 class="text-center text-4xl font-bold text-primary-400 mb-4">Welcome to CryptoSquare</h1>
    <UCard :ui="uiCardConfig">
      <h1 class="text-2xl font-semibold text-primary-300 mb-4">Our Mission</h1>

      <p class="">
        At CryptoQuest, we believe that learning cryptography should be as exciting as it is enriching. Our platform
        combines the best of both worlds: the thrill of puzzle-solving with the acquisition of cryptography knowledge.
      </p>
    </UCard>

    <h2 class="text-2xl font-semibold text-primary-300 ml-2 mt-8 mb-2">What Makes Us Unique</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <UCard :ui="uiCardConfig">
        <h3 class="text-xl font-medium text-primary-200 mb-3">A Gamified Learning Experience</h3>
        <p class="">Dive into a world of cryptographic puzzles carefully designed for all skill levels. Each challenge
          brings you closer to understanding the secrets of cryptography while earning points and climbing the
          leaderboard.</p>
      </UCard>
      <UCard :ui="uiCardConfig">
        <h3 class="text-xl font-medium text-primary-200 mb-3">Team Spirit Above All</h3>
        <p class="">Cryptography is more fun together! Join a team or create your own to participate in exciting
          competitions. Collaborate, share strategies, and climb the global rankings as a team.</p>
      </UCard>
      <UCard :ui="uiCardConfig">
        <h3 class="text-xl font-medium text-primary-200 mb-3">Smart Hint System</h3>
        <p class="">Stuck on a puzzle? No worries! Our hint system helps you progress at your own pace. Choose wisely:
          using a hint will decrease your points, but will help you move forward in your learning journey.</p>
      </UCard>
      <UCard :ui="uiCardConfig">
        <h3 class="text-xl font-medium text-primary-200 mb-3">Personalized Progress Tracking</h3>
        <p class="">Monitor your progress in detail: number of attempts, solved puzzles, accumulated points... Your
          learning path is fully documented to help you measure your growth.</p>
      </UCard>
    </div>

    <div class="text-center">
      <h2 class="text-2xl font-semibold text-primary-300 mt-8">Join the Adventure</h2>
      <p class=" mb-6">Ready to take on the challenge? Sign up now and begin your journey into the fascinating world of
        cryptography. Each solved puzzle brings you one step closer to mastering this ancient art</p>
      <p class="text-xl font-medium text-primary-400">Cryptography is waiting for you!</p>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const uiCardConfig: object = {
  base: `basis-1/2 m-2`,
  background: "bg-gray-200 dark:bg-gray-900",
}
</script>
