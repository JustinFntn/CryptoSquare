<template>
    <div class="my-4">
        <UContainer>
            <h1 class="text-2xl text-primary-500 font-semibold">Create new squad</h1>
            <UFormGroup label="Squad name">
                <UInput />
            </UFormGroup>
            <UFormGroup label="Squad description">
                <UTextarea />
            </UFormGroup>
            <div class="my-4">
                <h2 class="font-semibold">Squad color</h2>
                <div class="flex flex-wrap gap-2">
                    <div v-for="color in colors" :key="color" :style="{ backgroundColor: color }"
                        class="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-gray-500 flex items-center justify-center"
                        :class="{ 'border-gray-800 dark:border-white border-4': selectedColor === color }"
                        @click="selectedColor = color">
                        <span v-if="selectedColor === color" class="text-white text-lg font-bold">✓</span>
                    </div>
                </div>
            </div>
            <UButton label="Create" block variant="outline" icon="i-lucide-plus" />
        </UContainer>
    </div>
</template>

<script setup>
import { ref } from "vue";

const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F1C40F",
    "#8E44AD",
    "#E74C3C",
    "#2ECC71",
    "#3498DB",
    "#F39C12",
    "#1ABC9C"
];

const selectedColor = ref(null);

definePageMeta({
    layout: 'user'
});
</script>
