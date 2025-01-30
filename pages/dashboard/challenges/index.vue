<template>
  <div class="my-4">
    <UContainer>
      <!-- Affiche un message si une erreur est survenue -->
      <p v-if="challengesStore.errorMessage" class="text-red-500">
        {{ challengesStore.errorMessage }}
      </p>

      <!-- Affiche un message de chargement si les données ne sont pas encore prêtes -->
      <p v-else-if="!challengesStore.isLoaded || !challengesStore.isSubmissionsLoaded">
        Chargement des défis...
      </p>

      <!-- Affiche les groupes de défis une fois les données chargées -->
      <template v-else>
        <DashboardChallengesGroup title="Easy" subtitle="For beginners" :challengesList="easyChallenges" />
        <DashboardChallengesGroup title="Medium" subtitle="Intermediate level" :challengesList="mediumChallenges" />
        <DashboardChallengesGroup title="Hard" subtitle="Expert level" :challengesList="hardChallenges" />
      </template>
    </UContainer>
  </div>
</template>

<script setup>
import { useChallengesStore } from '@/stores/challengesStore';
import { computed, onMounted } from 'vue';

const challengesStore = useChallengesStore();
const { user } = useUser();

onMounted(async () => {
  await challengesStore.fetchChallenges();
  if (user.value?.id) {
    await challengesStore.fetchSubmissions(user.value.id);
  }
  await nextTick();
});

definePageMeta({
  layout: "user",
});

// Filtrer les défis pour chaque niveau
const easyChallenges = computed(() => challengesStore.getChallengesByDifficulty('easy'));
const mediumChallenges = computed(() => challengesStore.getChallengesByDifficulty('medium'));
const hardChallenges = computed(() => challengesStore.getChallengesByDifficulty('hard'));
</script>
