<template>
  <div class="my-4">
    <UContainer>
      <p v-if="challengesStore.errorMessage" class="text-red-500">
        {{ challengesStore.errorMessage }}
      </p>

      <div v-else-if="!challengesStore.isLoaded || !challengesStore.isSubmissionsLoaded"
        class="flex justify-center items-center h-screen ">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
      </div>


      <template v-else>
        <DashboardChallengesGroup title="Easy" subtitle="For beginners" :challengesList="easyChallenges" />
        <DashboardChallengesGroup title="Medium" subtitle="Intermediate level" :challengesList="mediumChallenges" />
        <DashboardChallengesGroup title="Hard" subtitle="Expert level" :challengesList="hardChallenges" />
      </template>
    </UContainer>
  </div>
</template>

<script setup>
import { computed, watchEffect, nextTick } from 'vue';
import { useChallengesStore } from '@/stores/challengesStore';

const challengesStore = useChallengesStore();
const { user, isLoaded } = useUser();

watchEffect(async () => {
  if (!isLoaded.value) return;

  await challengesStore.fetchChallenges();

  if (user.value?.id) {
    await challengesStore.fetchSubmissions(user.value.id);
  } else {
    challengesStore.isSubmissionsLoaded = true;
  }

  await nextTick();
});

definePageMeta({
  layout: "user",
});

const easyChallenges = computed(() => challengesStore.getChallengesByDifficulty('easy'));
const mediumChallenges = computed(() => challengesStore.getChallengesByDifficulty('medium'));
const hardChallenges = computed(() => challengesStore.getChallengesByDifficulty('hard'));
</script>
