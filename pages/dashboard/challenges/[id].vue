<script setup>
import { useChallengeStore } from '@/stores/challengeStore';
import { useRoute } from 'vue-router';

const clueValue = ref(0);

const challengeStore = useChallengeStore();
const route = useRoute();

// Vérification et conversion de l'ID du challenge
const challengeId = computed(() => route.params.id || null);

// Vérifier si l'ID est bien défini avant de récupérer les données du challenge
const challengeData = computed(() => {
  return challengeId.value ? challengeStore.fetchChallengeById(challengeId.value) || {} : {};
});

definePageMeta({
  layout: 'user'
});

// Fonction pour valider l'utilisation d'un indice
const useClue = () => {
  console.log(`Using clue level ${clueValue.value}, -${clueValue.value * 10} points`);
  isOpen.value = false; // Fermer la modale après confirmation
};

const confirmClue = (clueID) => {
  console.log('clue confirmed', clueID)
}

</script>

<template>
  <div class="h-full w-full relative">
    <DashboardChallengesContent :content="challengeData.content" />

    <div class="absolute bottom-4 flex z-10 w-full justify-between px-4">
      <DashboardChallengesInput @use-clue="(level) => { isOpen = true; clueValue = level }" />
      <DashboardChallengesScore />
    </div>
  </div>
</template>
