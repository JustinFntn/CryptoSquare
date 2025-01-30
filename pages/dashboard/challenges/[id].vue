<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useChallengeStore } from "@/stores/challengeStore";
import Markdown from "vue3-markdown-it";

const challengeStore = useChallengeStore();
const route = useRoute();

const clueValue = ref(0);
const isOpen = ref(false);

const challengeId = computed(() => route.params.id || null);

watchEffect(() => {
  if (challengeId.value) {
    challengeStore.fetchChallengeById(challengeId.value);
  }
});

const challengeData = computed(() => challengeStore.challenge);

const isReviewMode = computed(() => challengeStore.isChallengeCompleted);

watch(isReviewMode, (newValue) => {
  console.log("🟢 isReviewMode mis à jour :", newValue);
});

console.log("🔵 isReviewMode au chargement :", isReviewMode.value);

definePageMeta({
  layout: "user",
});
</script>

<template>
  <div class="h-full w-full relative">
    <div v-if="challengeStore.isLoading">Chargement...</div>
    <div v-else-if="challengeStore.errorMessage">{{ challengeStore.errorMessage }}</div>
    <div v-else-if="challengeData">
      <h1 class="text-4xl font-extrabold text-white mb-2 ml-4">{{ challengeData.title }}</h1>
      <h2 class="text-2xl font-semibold text-gray-400 mb-6 ml-4">{{ challengeData.subtitle }}</h2>

      <div class="prose prose-invert text-white ml-4">
        <Markdown :source="challengeData.content" />
      </div>

      <div class="absolute bottom-4 flex z-10 w-full justify-between px-4">
        <DashboardChallengesInput :isReviewMode="isReviewMode" />
        <DashboardChallengesScore />
      </div>
    </div>
    <div v-else>
      <p class="text-red-500">Challenge introuvable ❌</p>
    </div>
  </div>
</template>

<style>
.prose-invert h1 {
  color: #ffffff;
}

.prose-invert h2 {
  color: #d1d5db;
}

.prose-invert p {
  color: #e5e7eb;
}
</style>
