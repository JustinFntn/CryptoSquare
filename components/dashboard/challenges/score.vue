<script setup>
import { useChallengeStore } from '@/stores/challengeStore';
const challengeStore = useChallengeStore();
</script>

<template>
    <div class="bg-neutral-900 border border-neutral-800 px-6 py-3 rounded-xl flex items-center text-white text-center">
        <div>
            <div>
                <h1 class="text-sm">Score</h1>
            </div>
            <div class="text-lg font-bold">
                {{ challengeStore.userScore }}
            </div>
        </div>
    </div>
</template>
