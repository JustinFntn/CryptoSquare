<template>
  <div class="my-4">
    <UContainer>
      <div>
        <h1 class="text-xl text-primary-500 font-semibold">Crypto Squads</h1>
        <p class="text-neutral-500">Join a clan to top the rankings.</p>

        <div>
          <DashboardChallengesGroupsPodium />
        </div>

        <UDivider class="my-4" />

        <div class="flex justify-between">
          <UInput color="primary" variant="outline" placeholder="Search..." />

          <UButton v-if="!isInGroup" label="Create a squad" icon="i-lucide-circle-plus" variant="outline"
            to="/dashboard/groups/new" />

          <UButton v-else label="Create a squad" icon="i-lucide-circle-plus" variant="outline"
            @click="showGroupWarning = true" />

        </div>

        <div class="mt-6">
          <DashboardChallengesGroupsCard />
        </div>
      </div>
    </UContainer>

    <!-- Modal d'avertissement -->
    <UModal v-model="showGroupWarning">
      <UCard>
        <h2 class="text-xl font-semibold text-red-500">Warning</h2>
        <p class="text-neutral-500">
          You are already in a squad! You must leave your current squad before creating a new one.
        </p>
        <div class="flex justify-end mt-4">
          <UButton color="red" variant="solid" @click="showGroupWarning = false">Close</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";

definePageMeta({
  layout: "user",
});

const userStore = useUserStore();
const showGroupWarning = ref(false);

// Vérifier si l'utilisateur est déjà dans un groupe
const isInGroup = computed(() => {
  return userStore.userGroupID !== null && userStore.userGroupID !== "";
});
</script>
