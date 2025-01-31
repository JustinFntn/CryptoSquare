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
        <NuxtLink :to="`/dashboard/groups/${group._id}`" class="flex flex-1 items-center gap-3">
          <div class="h-10 w-10 rounded" :class="`bg-${group.color}-500`"></div>
          <div>
            <h1 class="text-lg font-semibold">{{ group.name }}</h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ group.description }}</p>
          </div>
        </NuxtLink>

        <!-- Bouton Quitter -->
        <UButton v-if="userStore.userGroupID === group._id" @click="leaveGroup(group._id)" icon="i-lucide-x" color="red"
          variant="ghost" label="Quitter">
        </UButton>

        <!-- Bouton Rejoindre avec vérification -->
        <UButton v-else @click.stop="attemptJoinGroup(group._id)" icon="i-lucide-plus" color="primary" variant="ghost"
          label="Join">
        </UButton>
      </div>
    </UCard>

    <!-- Modal d'avertissement -->
    <UModal v-model="showGroupWarning">
      <UCard>
        <h2 class="text-xl font-semibold text-red-500">Warning</h2>
        <p class="text-neutral-500">
          You are already in a squad! You must leave your current squad before joining a new one.
        </p>
        <div class="flex justify-end mt-4">
          <UButton color="red" variant="solid" @click="showGroupWarning = false">Close</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useGroupsStore } from '@/stores/groupsStore';
import { useUserStore } from '@/stores/userStore';

const loading = ref(false);
const groupsStore = useGroupsStore();
const userStore = useUserStore();
const showGroupWarning = ref(false);

const isInGroup = computed(() => {
  return userStore.userGroupID !== null && userStore.userGroupID !== "";
});


const attemptJoinGroup = (groupId) => {
  if (isInGroup.value) {
    showGroupWarning.value = true;
  } else {
    groupsStore.joinGroup(groupId);
  }
};

const leaveGroup = async (groupId) => {
  await userStore.leaveGroup();
  await groupsStore.fetchAllGroups();
};

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
});
</script>
