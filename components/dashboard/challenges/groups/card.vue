<template>
  <div class="my-2">
    <div class="flex flex-col gap-4" v-if="loading">
      <USkeleton class="h-24" />
      <USkeleton class="h-24" />
      <USkeleton class="h-24" />
    </div>

    <UCard v-for="group in groupsStore.groups" :key="group._id"
      class="rounded border border-transparent hover:border-primary-500 transition my-2 p-4">

      <div class="flex justify-between items-center">
        <!-- Infos du groupe avec le lien -->
        <NuxtLink :to="`/dashboard/groups/${group._id}`" class="flex flex-1 items-center gap-3">
          <div class="h-10 w-10 rounded" :class="`bg-${group.color}-500`"></div>
          <div>
            <h1 class="text-lg font-semibold">{{ group.name }}</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ group.description }}</p>
          </div>
        </NuxtLink>

        <!-- Bouton en dehors du NuxtLink -->
        <UButton v-if="groupsStore.isMyGroup(group._id)" @click="groupsStore.leaveGroup(group._id)" icon="i-lucide-x"
          color="red" variant="ghost" label="Quitter">
        </UButton>


        <UButton v-else @click.stop="groupsStore.joinGroup(group._id)" icon="i-lucide-plus" color="primary"
          variant="ghost" label="Join">
        </UButton>
      </div>

    </UCard>
  </div>
</template>


<script setup>
import { useGroupsStore } from '@/stores/groupsStore';

const loading = ref(false);
const groupsStore = useGroupsStore();

const fetchGroups = async () => {
  try {
    console.log("Chargement en cours...");
    loading.value = true;

    await groupsStore.fetchAllGroups();
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes:', error);
  } finally {
    loading.value = false;
    console.log("Chargement terminé !");
  }
};

onMounted(() => {
  fetchGroups();
  console.log("Liste des groupes chargés :", groupsStore.groups);
});
</script>
