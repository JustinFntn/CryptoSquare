<template>
  <div class="my-4">
    <UContainer>
      <template v-if="groupsStore.isLoaded">
        <div class="flex gap-3">
          <div class="h-10 w-10 rounded" :class="`bg-${groupsStore.groupData?.color ?? 'gray'}-500`"></div>
          <h1 class="text-4xl font-semibold text-primary-500">{{ groupsStore.groupData?.name ?? 'Unknown Squad' }}</h1>
        </div>

        <UBadge :label="`${groupsStore.members.length} members`" variant="soft" class="mt-4" />
        <p class="text-neutral-500 mt-2">{{ groupsStore.groupData?.description ?? "No description available" }}</p>
        <h1 class="text-4xl font-semibold text-primary-500 mt-6">Score</h1>
        <div>
          <ul class="flex gap-3 w-full mt-4">
            <li class="flex-1">
              <UCard class="w-full">
                <div class="flex flex-col items-center">
                  <h1 class="text-green-400 font-bold text-2xl">Easy</h1>
                  <UBadge :label="groupsStore.scores.easy" color="green" variant="soft" />
                </div>
              </UCard>
            </li>
            <li class="flex-1">
              <UCard class="w-full">
                <div class="flex flex-col items-center">
                  <h1 class="text-amber-400 font-bold text-2xl">Medium</h1>
                  <UBadge :label="groupsStore.scores.medium" color="amber" variant="soft" />
                </div>
              </UCard>
            </li>
            <li class="flex-1">
              <UCard class="w-full">
                <div class="flex flex-col items-center">
                  <h1 class="text-red-400 font-bold text-2xl">Hard</h1>
                  <UBadge :label="groupsStore.scores.hard" color="red" variant="soft" />
                </div>
              </UCard>
            </li>
          </ul>
        </div>

        <h1 class="text-4xl font-semibold text-primary-500 mt-6">Members</h1>
        <UTable :rows="groupsStore.members" :columns="columns" />
      </template>

      <template v-else>
        <div class="flex justify-center items-center h-screen">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
        </div>
      </template>
    </UContainer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGroupsStore } from "@/stores/groupsStore";

const route = useRoute();
const groupsStore = useGroupsStore();

const scores = ref({ easy: 0, medium: 0, hard: 0 });

const fetchScores = async () => {
  const groupScores = await groupsStore.fetchGroupScores(route.params.id);

  if (groupScores) {
    scores.value = groupScores;
  } else {
    console.warn("⚠️ Impossible de charger les scores !");
  }
};

definePageMeta({
  layout: "user",
});

useHead({
  title: 'Groups - Crypto Square'
})

onMounted(() => groupsStore.fetchGroupData(route.params.id));
</script>
