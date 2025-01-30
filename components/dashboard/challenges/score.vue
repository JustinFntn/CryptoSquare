<script setup>
import { useChallengeStore } from '@/stores/challengeStore';
const challengeStore = useChallengeStore();
</script>

<template>
    <div
        class="prose mx-4 bg-neutral-900 border border-neutral-800 px-6 py-3 rounded-xl flex items-center text-theme-text text-center">
        <div>
            <div>
                <h1 class="text-sm text-theme-text">Score</h1>
            </div>
            <div class="text-lg font-bold text-theme-text">
                {{ challengeStore.userScore }}
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --theme-text: white;
}

[data-theme='dark'] {
    --theme-text: white;
}

[data-theme='light'] {
    --theme-text: black;
}

.text-theme-text {
    color: var(--theme-text);
}
</style>
