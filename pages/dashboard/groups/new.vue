<template>
  <div class="my-4">
    <UContainer>
      <h1 class="text-2xl text-primary-500 font-semibold">Create new squad</h1>

      <UFormGroup label="Squad name">
        <UInput v-model="squadName" />
      </UFormGroup>

      <UFormGroup label="Squad description">
        <UTextarea v-model="squadDescription" />
      </UFormGroup>

      <div class="my-4">
        <h2 class="font-semibold">Squad color</h2>
        <div class="flex flex-wrap gap-2">
          <div v-for="color in colors" :key="color"
            class="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-gray-500 flex items-center justify-center"
            :class="[
              `bg-${color}-500`,
              selectedColor === color ? 'border-gray-800 dark:border-white border-4' : ''
            ]" @click="selectedColor = color">
            <span v-if="selectedColor === color" class="text-white text-lg font-bold">✓</span>
          </div>
        </div>
      </div>

      <UButton label="Create" block variant="outline" icon="i-lucide-plus"
        :disabled="!squadName.trim() || !selectedColor" @click="createSquad" />
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useGroupsStore } from "@/stores/groupsStore";

const store = useGroupsStore();
const userStore = useUserStore();
const router = useRouter()

// Utilisation des couleurs Tailwind disponibles
const colors = [
  "red", "green", "blue", "yellow", "purple",
  "pink", "teal", "indigo", "orange", "cyan"
];

const selectedColor = ref("");
const squadName = ref("");
const squadDescription = ref("");

const createSquad = async () => {
  if (!squadName.value.trim() || !selectedColor.value) return;

  const newSquad = {
    name: squadName.value,
    description: squadDescription.value,
    color: selectedColor.value,
  };

  try {
    const createdGroup = await store.createGroup(newSquad);

    console.log("Groupe créé :", createdGroup); // Debug

    // Accéder à l'ID dans createdGroup.group._id
    if (createdGroup && createdGroup.group && createdGroup.group._id) {
      await userStore.assignUserToGroup(createdGroup.group._id);
    } else {
      console.error("Le groupe n'a pas d'ID valide :", createdGroup);
    }

    // Réinitialiser les valeurs
    squadName.value = "";
    squadDescription.value = "";
    selectedColor.value = "";
    router.push('/dashboard/groups')
  } catch (error) {
    console.error("Failed to create squad:", error);
  }
};

definePageMeta({
  layout: "user",
});
</script>
