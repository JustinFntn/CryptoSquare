<script setup>
import { useChallengeStore } from '@/stores/challengeStore';
const challengeStore = useChallengeStore();
</script>

<template>
    <UCard class="mx-4 border border-neutral-800 rounded-xl bg-neutral-200 dark:bg-neutral-900">
        <h1 class="text-lg font-semibold">Score</h1>
        <div class="text-lg font-bold text-center">
            {{ challengeStore.userScore }}
        </div>
    </UCard>
</template>
