<template>
  <div class="min-h-screen mt-4">
    <UContainer class="max-w-7xl mx-auto">
      <div v-if="isAuthenticated" class="text-left mb-12">
        <h1 class="text-xl text-primary-500 font-semibold">Profile of {{ user.username }}</h1>
        <p class="text-lg text-neutral-500">
          Check your statistics and achievements.
        </p>
      </div>
      <div v-else class="text-center mb-12">
        <h1 class="text-4xl font-bold text-primary-500">You are not logged in</h1>
        <p class="text-lg text-neutral-500 dark:text-neutral-400 mt-4">
          Please log in to view your profile.
        </p>
      </div>
      <div v-if="isAuthenticated" class="space-y-8">
        <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-800">
          <h2 class="text-2xl font-semibold text-primary-500">Group</h2>
          <p class="text-neutral-500 dark:text-neutral-400 mt-2">
            You belong to the Group: {{ user.groupName || 'No Group' }}.
          </p>
        </div>
        <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-800">
          <h2 class="text-2xl font-semibold text-primary-500">Points</h2>
          <p class="text-neutral-500 dark:text-neutral-400 mt-2">
            You have accumulated {{ challengeStore.userScore }} points.
          </p>
        </div>
        <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-800">
          <h2 class="text-2xl font-semibold text-primary-500">Challenges Réussis</h2>
          <p class="text-neutral-500 dark:text-neutral-400 mt-2">
            You have completed {{ completedChallenges.length }} challenges.
          </p>
          <ul class="list-disc list-inside mt-4">
            <li v-for="challenge in completedChallenges" :key="challenge._id">
              {{ challenge.title }}
            </li>
          </ul>
        </div>
        <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-800">
          <h2 class="text-2xl font-semibold text-primary-500">Attempts</h2>
          <p class="text-neutral-500 dark:text-neutral-400 mt-2">
            Total number of attempts: {{ totalAttempts }}
          </p>
        </div>
        <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-800">
          <h2 class="text-2xl font-semibold text-primary-500">Clues</h2>
          <p class="text-neutral-500 dark:text-neutral-400 mt-2">
            Total number of clues used: {{ totalCluesUsed }}
          </p>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { useChallengeStore } from '@/stores/challengeStore';
import { computed } from 'vue';

const challengeStore = useChallengeStore();

const { user } = useUser()

const isAuthenticated = computed(() => !!user.value);

const completedChallenges = computed(() => {
  return challengeStore.challenges.filter(challenge => challenge.isCompleted);
});

const totalAttempts = computed(() => {
  return challengeStore.challenges.reduce((sum, challenge) => sum + challenge.attempts, 0);
});

const totalCluesUsed = computed(() => {
  return challengeStore.cluesUsed.length;
});


definePageMeta({
  layout: "user",
});
</script>
