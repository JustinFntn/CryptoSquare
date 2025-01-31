<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useChallengeStore } from "@/stores/challengeStore";


const challengeStore = useChallengeStore();
const router = useRouter();
const toast = useToast();

const inputValue = ref("");
const isOpen = ref(false);
const clueValue = ref(null);

const props = defineProps({
    isReviewMode: {
        type: Boolean,
        default: false
    }
});

function submitAnswer() {
    if (!props.isReviewMode && !challengeStore.isChallengeCompleted) {
        const result = challengeStore.checkAnswer(inputValue.value);

        if (result) {
            if (!result.success) {
                toast.add({
                    title: "Mauvaise réponse ❌",
                    description: `-${result.penalty} points. Réessaie.`,
                    color: "red",
                    timeout: 2000,
                    actions: [],
                    icon: "i-lucide-alert-triangle",
                    closable: false,
                    keepAlive: false,
                });
            }
        }

        inputValue.value = "";
    }
}


function openClueModal(clueIndex) {
    clueValue.value = clueIndex;
    isOpen.value = true;
}
</script>

<template>
    <div class="flex gap-3 items-center bg-neutral-900 p-3 rounded-xl border border-neutral-700">
        <div class="flex gap-2 w-full">
            <div class="bg-neutral-800 flex items-center px-4 py-1 rounded-full border-2 border-primary-500 w-full"
                :class="{ 'opacity-50 cursor-not-allowed': isReviewMode || challengeStore.isChallengeCompleted }">

                <input v-model="inputValue" type="text"
                    class="outline-none focus:ring-0 w-full focus:border-transparent bg-transparent text-white text-theme-text"
                    placeholder="Tape ta réponse ici" :disabled="isReviewMode || challengeStore.isChallengeCompleted" />

                <button @click="submitAnswer"
                    class="hover:text-primary-500 flex items-center text-theme-text transition-all"
                    :class="{ 'opacity-50 cursor-not-allowed': isReviewMode || challengeStore.isChallengeCompleted || !inputValue }"
                    :disabled="isReviewMode || challengeStore.isChallengeCompleted || !inputValue">
                    <UIcon name="i-lucide-send-horizontal" />
                </button>

            </div>
        </div>

        <!-- Liste des indices -->
        <div>
            <ul class="flex gap-2">
                <li v-for="(clue, index) in challengeStore.cluesAvailable" :key="index" class="relative">
                    <div class="relative inline-block">
                        <UButton icon="i-lucide-badge-help"
                            :color="index === 0 ? 'green' : index === 1 ? 'yellow' : 'red'"
                            @click="openClueModal(index)" :disabled="isReviewMode" class="relative" />
                        <!-- Pastille bleue si l'indice n'a pas encore été utilisé -->
                        <span v-if="!challengeStore.cluesUsed.some(c => c.hintType === index.toString())"
                            class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 w-3 h-3 rounded-full" />
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <!-- Modal d'indice
    <DashboardChallengesClueModal v-model:isOpen="isOpen" :clue-value="clueValue" @close="isOpen = false" />
    <UCard class="flex items-center border border-neutral-800 rounded-xl bg-neutral-200 dark:bg-neutral-900">
        <UButtonGroup :ui="{ rounded: 'rounded-full' }">
            <UInput v-model="inputValue" variant="outline" placeholder="Enter your answer"
                :ui="{ variant: { outline: 'bg-transparent' } }" />
            <UButton icon="i-lucide-send-horizontal" @click="submitAnswer"
                :disabled="isReviewMode || challengeStore.isChallengeCompleted" />
        </UButtonGroup>
    </UCard> -->
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
