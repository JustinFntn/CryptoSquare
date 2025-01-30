<template>
    <div class="flex gap-3 items-center bg-neutral-900 p-3 rounded-xl border border-neutral-700">
        <div class="flex gap-2 w-full">
            <!-- Input désactivé en mode Review ou après la victoire -->
            <div class="bg-neutral-800 flex items-center px-4 py-1 rounded-full border-2 border-primary-500 w-full"
                :class="{ 'opacity-50 cursor-not-allowed': isReviewMode || challengeStore.isChallengeCompleted }">
                <input v-model="inputValue" type="text"
                    class="outline-none focus:ring-0 w-full focus:border-transparent bg-transparent text-white"
                    placeholder="Tape ta réponse ici" :disabled="isReviewMode || challengeStore.isChallengeCompleted">
                <button @click="submitAnswer" class="hover:text-primary-500 flex items-center"
                    :disabled="isReviewMode || challengeStore.isChallengeCompleted">
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

                        <!-- Pastille bleue si l'indice n'a pas été utilisé -->
                        <span v-if="!challengeStore.cluesUsed.some(c => c.hintType === index.toString())"
                            class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 w-3 h-3 rounded-full">
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <!-- Modal d'indice -->
    <DashboardChallengesClueModal v-model:isOpen="isOpen" :clue-value="clueValue" @close="isOpen = false" />
</template>

<script setup>
import { ref, computed } from "vue";
import { useChallengeStore } from "@/stores/challengeStore";
import { useRouter } from "vue-router";

const challengeStore = useChallengeStore();
const router = useRouter();
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
        challengeStore.checkAnswer(inputValue.value);
        inputValue.value = "";
    }
}

// Fonction pour ouvrir la modale avec l'indice sélectionné
function openClueModal(clueIndex) {
    clueValue.value = clueIndex;
    isOpen.value = true;
}
</script>
