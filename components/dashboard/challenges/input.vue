<script setup>
import { ref } from "vue";
import { useChallengeStore } from "@/stores/challengeStore";
import { useRouter } from "vue-router";

const challengeStore = useChallengeStore();
const router = useRouter();
const inputValue = ref("");
const isOpen = ref(false);
const clueValue = ref(null);

function openClueModal(value) {
    if (!challengeStore.isChallengeCompleted) {
        clueValue.value = value;
        isOpen.value = true;
    }
}

function closeModal() {
    isOpen.value = false;
}

function submitAnswer() {
    if (!challengeStore.isChallengeCompleted) {
        challengeStore.checkAnswer(inputValue.value);
        inputValue.value = ""; // Réinitialise l'input après soumission
    }
}

function returnToDashboard() {
    challengeStore.closeVictoryModal();
    router.push("/dashboard"); // Redirection vers le dashboard
}
</script>

<template>
    <div class="flex gap-3 items-center bg-neutral-900 p-3 rounded-xl border border-neutral-700">
        <div class="flex gap-2 w-full">
            <!-- Input désactivé après la victoire -->
            <div class="bg-neutral-800 flex items-center px-4 py-1 rounded-full border-2 border-primary-500 w-full"
                :class="{ 'opacity-50 cursor-not-allowed': challengeStore.isChallengeCompleted }">
                <input v-model="inputValue" type="text"
                    class="outline-none focus:ring-0 w-full focus:border-transparent bg-transparent text-white"
                    placeholder="Tape ta réponse ici" :disabled="challengeStore.isChallengeCompleted">
                <button @click="submitAnswer" class="hover:text-primary-500 flex items-center"
                    :disabled="challengeStore.isChallengeCompleted">
                    <UIcon name="i-lucide-send-horizontal" />
                </button>
            </div>
        </div>

        <!-- Liste des indices -->
        <div>
            <ul class="flex gap-2">
                <li v-for="clue in challengeStore.cluesAvailable" :key="clue">
                    <UChip :show="!challengeStore.cluesUsed.includes(clue)"
                        :class="{ 'opacity-50 cursor-not-allowed': challengeStore.isChallengeCompleted }">
                        <UButton icon="i-lucide-badge-help"
                            :color="clue === 'easy' ? 'green' : clue === 'medium' ? 'yellow' : 'red'"
                            @click="openClueModal(clue)" :disabled="challengeStore.isChallengeCompleted" />
                    </UChip>
                </li>
            </ul>
        </div>
    </div>

    <DashboardChallengesClueModal :clue-value="clueValue" v-model:isOpen="isOpen" @close="closeModal" />

    <!-- Modal de victoire -->
    <UModal :model-value="challengeStore.showVictoryModal" @update:model-value="challengeStore.closeVictoryModal">
        <div class="p-6 text-center">
            <h1 class="text-2xl font-bold text-green-500">🎉 Félicitations ! 🎉</h1>
            <p class="mt-4 text-white">Tu as trouvé la bonne réponse !</p>
            <div class="flex gap-4 justify-center mt-6">
                <UButton label="Retourner au dashboard" color="green" icon="i-lucide-home" @click="returnToDashboard" />
                <UButton label="Fermer" color="red" icon="i-lucide-x" @click="challengeStore.closeVictoryModal" />
            </div>
        </div>
    </UModal>
</template>
