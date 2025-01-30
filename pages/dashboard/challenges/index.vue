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
        <!-- TODO SPINNER CHARGEMENT -->
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
import { computed, watchEffect, nextTick } from 'vue';
import { useChallengesStore } from '@/stores/challengesStore';

const challengesStore = useChallengesStore();
const { user, isLoaded } = useUser(); // Clerk user

watchEffect(async () => {
  // Attendre que Clerk charge l'utilisateur
  if (!isLoaded.value) return;

  // Lancer la récupération des challenges
  await challengesStore.fetchChallenges();

  // Si un utilisateur est connecté, récupérer ses soumissions
  if (user.value?.id) {
    await challengesStore.fetchSubmissions(user.value.id);
  } else {
    challengesStore.isSubmissionsLoaded = true;
  }

  await nextTick();
});

// Métadonnées de la page
definePageMeta({
  layout: "user",
});

// Filtrer les défis pour chaque niveau
const easyChallenges = computed(() => challengesStore.getChallengesByDifficulty('easy'));
const mediumChallenges = computed(() => challengesStore.getChallengesByDifficulty('medium'));
const hardChallenges = computed(() => challengesStore.getChallengesByDifficulty('hard'));
</script>
