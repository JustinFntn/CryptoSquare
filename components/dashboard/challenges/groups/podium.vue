<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGroupsStore } from "@/stores/groupsStore";
import { useRouter } from "vue-router";

interface Group {
  _id: string;
  name: string;
  totalPoints: number;
}

const groupsStore = useGroupsStore();
const router = useRouter();
const podiumGroups = ref<Group[]>([]);

const fetchPodium = async () => {
  console.log("📌 Chargement du podium des squads...");

  await groupsStore.fetchAllGroups();

  const scoredGroups: Group[] = await Promise.all(
    groupsStore.groups.map(async (group: Group) => {
      const totalPoints = await groupsStore.fetchGroupTotalPoints(group._id);
      return { _id: group._id, name: group.name, totalPoints };
    })
  );

  podiumGroups.value = scoredGroups
    .filter((group) => group.totalPoints > 0)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 3);

  console.log("🏆 Podium mis à jour :", podiumGroups.value);
};

onMounted(fetchPodium);
</script>

<template>
  <div class="my-8">
    <UCard>
      <h1 class="text-xl mb-3 text-center font-bold">🏆 Podium of the Best Squads 🏆</h1>
      <div class="flex justify-center items-end gap-8 w-full">
        <div v-if="podiumGroups.length > 1" class="flex-1 flex justify-end">
          <div v-if="podiumGroups[1]"
            class="flex flex-col items-center justify-between text-center h-[200px] bg-gray-400/30 border-gray-500 border p-4 rounded-lg shadow-lg w-40">
            <UBadge :label="`${podiumGroups[1].totalPoints} pts`" color="gray" variant="solid"
              class="text-lg font-semibold" />
            <h1 class="mb-2 font-semibold text-lg text-white">{{ podiumGroups[1].name }}</h1>
            <UButton variant="ghost" label="View Squad" icon="i-lucide-send-horizontal" size="sm"
              @click="router.push(`/dashboard/groups/${podiumGroups[1]._id}`)" />
          </div>
        </div>

        <div class="flex-1 flex justify-center">
          <div v-if="podiumGroups[0]"
            class="flex flex-col items-center justify-between text-center h-[250px] bg-yellow-400/30 border-yellow-500 border p-4 rounded-lg shadow-lg w-48">
            <UBadge :label="`${podiumGroups[0].totalPoints} pts`" color="yellow" variant="solid"
              class="text-lg font-semibold" />
            <h1 class="mb-2 font-semibold text-lg text-white">{{ podiumGroups[0].name }}</h1>
            <UButton variant="ghost" label="View Squad" icon="i-lucide-send-horizontal" size="sm"
              @click="router.push(`/dashboard/groups/${podiumGroups[0]._id}`)" />
          </div>
        </div>

        <div v-if="podiumGroups.length > 2" class="flex-1 flex justify-start">
          <div v-if="podiumGroups[2]"
            class="flex flex-col items-center justify-between text-center h-[175px] bg-orange-400/30 border-orange-500 border p-4 rounded-lg shadow-lg w-40">
            <UBadge :label="`${podiumGroups[2].totalPoints} pts`" color="orange" variant="solid"
              class="text-lg font-semibold" />
            <h1 class="mb-2 font-semibold text-lg text-white">{{ podiumGroups[2].name }}</h1>
            <UButton variant="ghost" label="View Squad" icon="i-lucide-send-horizontal" size="sm"
              @click="router.push(`/dashboard/groups/${podiumGroups[2]._id}`)" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
