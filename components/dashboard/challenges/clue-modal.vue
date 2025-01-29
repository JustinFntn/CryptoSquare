<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { useChallengeStore } from "@/stores/challengeStore";
import { useRoute } from "vue-router";

const props = defineProps({
    clueValue: String,
    isOpen: Boolean
});

const emit = defineEmits(["update:isOpen", "close"]);
const challengeStore = useChallengeStore();
const route = useRoute();

function confirmUseClue() {
    challengeStore.useClue(props.clueValue);
}

function closeModal() {
    emit("close");
    emit("update:isOpen", false);
}

const challenge = computed(() =>
    challengeStore.getChallengeById(route.params.id)
);

const clueData = computed(() => {
    if (!challenge.value) return { value: 0, clueLabel: "No clue available." };
    const clue = challenge.value.clues.find((c) => c.id === props.clueValue);
    return clue ? clue : { value: 0, clueLabel: "No clue available." };
});

</script>

<template>
    <UModal :model-value="isOpen" @update:model-value="$emit('update:isOpen', $event)">
        <div class="p-4">
            <h1 class="text-xl font-semibold capitalize">{{ clueValue }} clue</h1>

            <h2 v-if="!challengeStore.cluesUsed.includes(clueValue)" class="my-2">
                Are you sure you want to use this clue? You'll lose
                <span class="font-semibold text-primary-500">{{ clueData.value }}</span>
                points.
            </h2>

            <h2 v-else class="my-2">
                <span class="font-semibold text-primary-500"> Clue : {{ clueData.clueLabel }} </span>
            </h2>

            <div class="flex gap-3 w-full justify-end">
                <UButton v-if="!challengeStore.cluesUsed.includes(clueValue)" label="Yes" icon="i-lucide-check"
                    color="green" variant="ghost" @click="confirmUseClue" />
                <UButton label="Close" icon="i-lucide-x" color="red" variant="ghost" @click="closeModal" />
            </div>
        </div>
    </UModal>
</template>
