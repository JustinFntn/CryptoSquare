<template>
    <div class="w-full">
        <div class="my-2">
            <h1 class="text-xl font-semibold">{{ title }}</h1>
            <p class="text-neutral-500">{{ subtitle }}</p>
        </div>
        <!-- Conteneur avec un défilement horizontal -->
        <div class="overflow-x-auto">
            <!-- Flexbox pour les cartes -->
            <div class="flex gap-3 w-fit py-2">
                <!-- Boucle sur la liste des défis -->
                <DashboardChallengesCard v-for="challenge in challengesList" :key="challenge.id"
                    :title="challenge.title" :difficulty="challenge.difficulty" :subtitle="challenge.subtitle"
                    :_id="challenge._id" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    challengesList: {
        type: Array,
        required: true
    }
});
</script>
