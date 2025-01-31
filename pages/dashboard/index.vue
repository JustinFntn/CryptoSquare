<template>
  <UContainer>
    <div class="my-4">
      <h1 class="text-2xl font-semibold text-primary-400">Dashboard</h1>
      <DashboardChallengesGroup v-if="isDataLoaded" title="Pick up where you left off..."
        :challengesList="easyChallenges" />
      <div>
        <h1 class="font-semibold text-xl">News</h1>
        <ul class="my-4">
          <li>
            <UCard class="w-fit">
              <h1 class="text-lg font-semibold">🎉 Publication 🎉</h1>
              <p class="text-neutrel-500">Application launched on January 30, 2025</p>
              <UButton label="Read more" variant="outline" class="my-3" />
            </UCard>
          </li>
        </ul>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
import { computed, onMounted, watchEffect } from "vue";
import { useChallengesStore } from "@/stores/challengesStore";

definePageMeta({
  layout: "user",
});

const challengesStore = useChallengesStore();
const userId = "user_2sL8ZHbChTP9x5BWE4WxCoZpgVA";

// Charger les données au montage
onMounted(() => {
  challengesStore.fetchChallenges();
  challengesStore.fetchSubmissions(userId);
});

// Vérifier si les données sont bien chargées
const isDataLoaded = computed(() => challengesStore.isLoaded && challengesStore.isSubmissionsLoaded);

// Mettre à jour les challenges dynamiquement
const easyChallenges = computed(() => {
  if (!challengesStore.isLoaded || !challengesStore.isSubmissionsLoaded) return [];
  return challengesStore.getChallengesByStatus(userId, "in_progress");
});

</script>
