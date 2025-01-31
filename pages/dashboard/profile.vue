<template>
  <div class="min-h-screen mt-4">
    <UContainer class="max-w-7xl mx-auto">
      <template v-if="isLoaded">
        <div v-if="isAuthenticated" class="text-left mb-12">
          <h1 class="text-xl text-primary-500 font-semibold">Profile of {{ user?.username }}</h1>
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
              You belong to the Group: {{ user?.groupName || 'No Group' }}.
            </p>
          </div>
          <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-800">
            <h2 class="text-2xl font-semibold text-primary-500">Points</h2>
            <p class="text-neutral-500 dark:text-neutral-400 mt-2">
              You have accumulated {{ challengesStore?.userScore ?? 0 }} points.
            </p>
          </div>
          <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-800">
            <h2 class="text-2xl font-semibold text-primary-500">Completed Challenges</h2>
            <p class="text-neutral-500 dark:text-neutral-400 mt-2">
              You have completed {{ completedChallenges?.length ?? 0 }} challenges.
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
              Total number of attempts: {{ totalAttempts ?? 0 }}
            </p>
          </div>
          <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow ring-1 ring-gray-200 dark:ring-gray-800">
            <h2 class="text-2xl font-semibold text-primary-500">Clues</h2>
            <p class="text-neutral-500 dark:text-neutral-400 mt-2">
              Total number of clues used: {{ totalCluesUsed ?? 0 }}
            </p>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex justify-center items-center h-screen">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
        </div>
      </template>
    </UContainer>
  </div>
</template>



<script setup>
import { useChallengesStore } from '@/stores/challengesStore';
import { computed, watchEffect } from 'vue';
import { useUser } from '#imports';

const challengesStore = useChallengesStore();
const { user, isLoaded, isSignedIn } = useUser();

const isAuthenticated = computed(() => isLoaded.value && isSignedIn.value && user.value);

watchEffect(async () => {
  if (isAuthenticated.value) {
    await challengesStore.fetchChallenges();
    await challengesStore.fetchSubmissions(user.value.id);
  }
});

const completedChallenges = computed(() => {
  if (!isAuthenticated.value || !challengesStore.challenges.length || !challengesStore.submissions.length) return [];

  return challengesStore.challenges.filter(challenge => {
    return challengesStore.submissions.some(sub => sub.challengeId === challenge._id && sub.status === "completed");
  });
});

const totalAttempts = computed(() => {
  return isAuthenticated.value && challengesStore.submissions.length
    ? challengesStore.submissions.reduce((sum, sub) => sum + (sub.attemptCount || 0), 0)
    : 0;
});


const totalCluesUsed = computed(() => {
  return isAuthenticated.value && challengesStore.submissions.length
    ? challengesStore.submissions.reduce((sum, sub) => sum + (sub.hintsUsed?.length || 0), 0)
    : 0;
});

const userScore = computed(() => {
  return isAuthenticated.value && challengesStore.submissions.length
    ? challengesStore.submissions.reduce((total, sub) => total + (sub.pointsEarned || 0), 0)
    : 0;
});

definePageMeta({
  layout: "user",
});
</script>