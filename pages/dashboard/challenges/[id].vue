<script setup>
import { ref, computed, watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useChallengeStore } from "@/stores/challengeStore"
import Markdown from "vue3-markdown-it"

const challengeStore = useChallengeStore()
const route = useRoute()
const router = useRouter()

const { user, isLoaded, isSignedIn } = useUser()

const clueValue = ref(0)
const isOpen = ref(false)


const userAnswer = ref("")


const challengeId = computed(() => route.params.id || null)

watchEffect(async () => {
  if (!isLoaded.value) return

  if (!isSignedIn.value) {
    console.warn("Utilisateur non connecté. Redirection ou message d'erreur possible ici.")
    return
  }

  if (challengeId.value) {
    await challengeStore.fetchChallengeById(challengeId.value, user.value.id)
  }
})

const challengeData = computed(() => challengeStore.challenge)
const isReviewMode = computed(() => challengeStore.isChallengeCompleted)

function closeVictoryModal() {
  challengeStore.showVictoryModal = false
}

function returnToChallenges() {
  challengeStore.showVictoryModal = false
  router.push("/dashboard/challenges")
}

definePageMeta({
  layout: "user",
})
</script>

<template>
  <UNotifications />
  <div class="w-full">
    <div v-if="challengeStore.isLoading">Chargement...</div>
    <div v-else-if="challengeStore.errorMessage">{{ challengeStore.errorMessage }}</div>
    <div v-else-if="challengeData">
      <h1 class="text-2xl font-extrabold my-2 ml-4">
        {{ challengeData.title }}
      </h1>
      <h2 class="text-2xl font-semibold text-gray-400 mb-6 ml-4">
        {{ challengeData.subtitle }}
      </h2>

      <div class="prose dark:prose-invert mx-4">
        <Markdown :source="challengeData.content" />
      </div>

      <div class="mb-4 flex z-10 justify-between px-4">
        <DashboardChallengesInput :isReviewMode="isReviewMode" />
        <DashboardChallengesScore />
      </div>

      <!-- Modal de victoire -->
      <UModal :model-value="challengeStore.showVictoryModal" @update:model-value="closeVictoryModal">
        <div class="p-6 text-center">
          <h1 class="text-2xl font-bold text-green-500">🎉 Félicitations ! 🎉</h1>
          <p class="mt-4 dark:text-white">Tu as trouvé la bonne réponse !</p>
          <div class="flex gap-4 justify-center mt-6">
            <UButton label="Retour aux challenges" color="green" icon="i-lucide-home" @click="returnToChallenges" />
            <UButton label="Fermer" color="red" icon="i-lucide-x" @click="closeVictoryModal" />
          </div>
        </div>
      </UModal>
    </div>

    <div v-else>
      <p class="text-red-500">Chargement du Challenge...</p>
    </div>
  </div>
</template>

<style scoped>
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
