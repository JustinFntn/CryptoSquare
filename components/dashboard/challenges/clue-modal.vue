<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { useChallengeStore } from "@/stores/challengeStore";
import { useRoute } from "vue-router";

const props = defineProps({
    clueValue: Number,
    isOpen: Boolean
});

const emit = defineEmits(["update:isOpen", "close"]);
const challengeStore = useChallengeStore();
const route = useRoute();

function confirmUseClue() {
    console.log("Utilisation de l'indice :", props.clueValue);
    challengeStore.useClue(props.clueValue);
    if (challengeStore.cluesUsed.includes(props.clueValue)) {
        console.log("Indice utilisé avec succès !");
    }
}

function closeModal() {
    emit("close");
    emit("update:isOpen", false);
}

const challenge = computed(() => challengeStore.getChallengeById);

const clueData = computed(() => {
    if (!challenge.value || props.clueValue === null) return { value: 0, clueLabel: "No clue available." };

    const clue = challenge.value.clues[props.clueValue]; // Récupère l'indice via l'index

    return clue ? { value: clue.value, clueLabel: clue.textEnigme } : { value: 0, clueLabel: "No clue available." };
});



</script>

<template>
    <UModal :model-value="isOpen" @update:model-value="$emit('update:isOpen', $event)">
        <div class="p-4">
            <h1 class="text-xl font-semibold capitalize">Indice {{ clueValue }}</h1>

            <!-- ✅ Condition pour changer l'affichage une fois l'indice utilisé -->
            <h2 v-if="!challengeStore.cluesUsed.some(c => c.hintType === clueValue.toString())" class="my-2">
                Es-tu sûr de vouloir utiliser cet indice ? Tu perdras
                <span class="font-semibold text-primary-500">{{ challengeStore.challenge.clues[clueValue].value
                    }}</span>
                points.
            </h2>

            <h2 v-else class="my-2">
                <span class="font-semibold text-primary-500">
                    {{ challengeStore.challenge.clues[clueValue].textEnigme }}
                </span>
            </h2>

            <div class="flex gap-3 w-full justify-end">
                <UButton v-if="!challengeStore.cluesUsed.some(c => c.hintType === clueValue.toString())" label="Yes"
                    icon="i-lucide-check" color="green" variant="ghost" @click="confirmUseClue" />
                <UButton label="Close" icon="i-lucide-x" color="red" variant="ghost"
                    @click="$emit('update:isOpen', false)" />
            </div>
        </div>
    </UModal>
</template>