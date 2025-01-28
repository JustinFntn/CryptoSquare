<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked'; // Installe marked si ce n'est pas déjà fait : npm install marked

const markdownContent = ref('');

onMounted(async () => {
    const rawMd = await $fetch('/challenges/example.md'); // Charger le fichier .md
    markdownContent.value = marked(rawMd); // Convertir le Markdown en HTML
});

definePageMeta({
    layout: 'user'
})
</script>

<template>
    <UContainer>
        <div class="prose max-w-none" v-html="markdownContent"></div>
    </UContainer>
</template>