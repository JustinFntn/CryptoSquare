<template>
  <!-- <div class="bg-primary-500 text-neutral-50 p-1">
    <p>This application is under construction. It may contain some bugs.</p>
  </div> -->
  <div class="my-8">
    <h1 class="text-xl font-semibold text-primary-500">Dashboard</h1>
    <UContainer>
      <div>
        <h2 class="text-lg text-neutral-200"></h2>
        <DashboardChallengesGroup :title="'Pick up where you left off...'" :challengesList="easyChallenges" />
      </div>
    </UContainer>
    <UContainer>
      <div class="my-6">
        <h2 class="text-lg text-neutral-200">News</h2>
        <ul class="flex gap-4 overflow-x-auto p-1 pb-4 scrollbar-hidden">
          <li class="snap-start shrink-0 w-64">
            <UCard>
              <div class="flex flex-col gap-2">
                <h1 class="text-lg">Launching the application 🎉</h1>
                <p class="text-neutral-500">Application launch scheduled for January 30, 2025</p>
                <UButton label="Read more" class="w-fit" />
              </div>
            </UCard>
          </li>
        </ul>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { useChallengesStore } from '@/stores/challengesStore';

definePageMeta({
  layout: "user",
})
const challengesStore = useChallengesStore();

const easyChallenges = computed(() => challengesStore.getChallengesByDifficulty('medium'));
onMounted(() => {
  challengesStore.fetchChallenges();
});
</script>
