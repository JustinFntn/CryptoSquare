<template>
  <div class="my-4">
    <UContainer>
      <!-- Affiche un message si une erreur est survenue -->
      <p v-if="challengesStore.errorMessage" class="text-red-500">
        {{ challengesStore.errorMessage }}
      </p>

      <!-- Affiche un message de chargement si les données ne sont pas encore prêtes -->
      <p v-else-if="!challengesStore.isLoaded">Chargement des défis...</p>

      <!-- Affiche les groupes de défis une fois les données chargées -->
      <template v-else>
        <DashboardChallengesGroup :title="'Easy'" :subtitle="'Created especially for beginners in cryptography'"
          :challengesList="easyChallenges" />
        <DashboardChallengesGroup :title="'Medium'"
          :subtitle="'This section is reserved for intermediate users. You can still participate if you have a basic understanding of cryptography.'"
          :challengesList="mediumChallenges" />
        <DashboardChallengesGroup :title="'Hard'"
          :subtitle="'Be careful! Only cryptographic experts will be able to solve these challenges.'"
          :challengesList="hardChallenges" />
      </template>
    </UContainer>
  </div>
</template>

<script setup>
import { useChallengesStore } from '@/stores/challengesStore';
import { computed, onMounted } from 'vue';

// Accéder au store Pinia
const challengesStore = useChallengesStore();

// Charger les défis au montage du composant
onMounted(() => {
  challengesStore.fetchChallenges();
});

definePageMeta({
  layout: 'user'
})

// Filtrer les défis pour chaque niveau
const easyChallenges = computed(() => challengesStore.getChallengesByDifficulty('easy'));
const mediumChallenges = computed(() => challengesStore.getChallengesByDifficulty('medium'));
const hardChallenges = computed(() => challengesStore.getChallengesByDifficulty('hard'));
</script>