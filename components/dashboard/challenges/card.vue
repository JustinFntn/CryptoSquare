<script setup>
import { computed } from "vue";
import { useChallengesStore } from "@/stores/challengesStore";
import { useChallengeStore } from "@/stores/challengeStore";

const props = defineProps({
    title: String,
    difficulty: String,
    subtitle: String,
    _id: String, // ID du challenge
});

const { user } = useUser();

const challengesStore = useChallengesStore();

// Vérifie si une soumission existe pour ce challenge
const submission = computed(() => {
    return challengesStore.submissions.find(
        (sub) => sub.challengeId === props._id && sub.userId === user.value?.id
    ) || null;
});

// Détermine le statut du challenge
const challengeStatus = computed(() => {
    if (!submission.value) return "New";
    return submission.value.status === "completed" ? "Completed" : "In Progress";
});

// ✅ Garde la couleur de la difficulté même si complété
const buttonColor = computed(() => {
    switch (props.difficulty) {
        case "easy":
            return "green";
        case "medium":
            return "amber";
        case "hard":
            return "red";
        default:
            return "blue";
    }
});

// ✅ Couleur de la vignette du statut
const statusColor = computed(() => {
    switch (challengeStatus.value) {
        case "New":
            return "gray";
        case "In Progress":
            return "blue";
        case "Completed":
            return "green";
        default:
            return "gray";
    }
});

// ✅ Change le texte du bouton selon le statut
const buttonLabel = computed(() => {
    return challengeStatus.value === "Completed" ? "Review Challenge" : "Start Challenge";
});

// ✅ Lien vers le challenge, mais en mode "review" si complété
const challengeLink = computed(() => {
    return `/dashboard/challenges/${props._id}${challengeStatus.value === "Completed" ? "?mode=review" : ""}`;
});
</script>

<template>
    <div class="w-56 border dark:border-neutral-800 rounded-lg">
        <div :class="backgroundClass" class="flex flex-col justify-end items-center rounded-t-lg h-20 py-2 relative">
            <!-- ✅ Affiche le statut (New, In Progress, Completed) -->
            <UBadge :label="challengeStatus" class="w-fit capitalize absolute top-2 left-2" :color="statusColor"
                variant="subtle" />
            <!-- ✅ Affiche la difficulté (ne change pas si complété) -->
            <UBadge :label="difficulty" class="w-fit capitalize absolute top-2 right-2" :color="buttonColor"
                variant="soft" />
            <h1 class="font-semibold line-clamp-2 text-center">
                {{ title }}
            </h1>
        </div>
        <div class="px-2 py-1">
            <p class="text-sm line-clamp-2">{{ subtitle }}</p>
            <!-- ✅ Bouton qui change selon le statut -->
            <UButton size="2xs" block :label="challengeStatus === 'Completed' ? 'Review Challenge' : 'Start Challenge'"
                class="my-2" icon="i-lucide-eye" :color="buttonColor" :to="`/dashboard/challenges/${props._id}`" />
        </div>
    </div>
</template>
