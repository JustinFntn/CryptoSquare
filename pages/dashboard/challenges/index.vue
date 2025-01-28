<template>
    <div class="my-4">
        <UContainer>
            <DashboardChallengesGroup :title="'Easy'" :subtitle="'Created especially for beginners in cryptography'"
                :challengesList="easyChallenges" />
            <DashboardChallengesGroup :title="'Medium'"
                :subtitle="'This section is reserved for intermediate users. You can still participate if you have a basic understanding of cryptography.'"
                :challengesList="mediumChallenges" />
            <DashboardChallengesGroup :title="'Hard'"
                :subtitle="'Be careful! Only cryptographic experts will be able to solve these challenges.'"
                :challengesList="hardChallenges" />
        </UContainer>
    </div>
</template>

<script setup>
import { useChallengesStore } from '@/stores/challengesStore';
import { computed, onMounted } from 'vue';

definePageMeta({
    layout: 'user'
});

// Accéder au store Pinia
const challengesStore = useChallengesStore();

// Filtrer les défis pour le niveau "Easy"
const easyChallenges = computed(() => challengesStore.getChallengesByDifficulty('easy'));

// Filtrer les défis pour le niveau "Medium"
const mediumChallenges = computed(() => challengesStore.getChallengesByDifficulty('medium'));

// Filtrer les défis pour le niveau "Hard"
const hardChallenges = computed(() => challengesStore.getChallengesByDifficulty('hard'));

// Vérification pour le SSR ou chargement des données
onMounted(() => {
    console.log('Easy Challenges:', easyChallenges.value);
});
</script>
