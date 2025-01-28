<script setup>
import { marked } from 'marked';

const markdownContent = ref('');

onMounted(async () => {
    const rawMd = await $fetch('/challenges/example.md');
    markdownContent.value = marked(rawMd);
});

definePageMeta({
    layout: 'user'
});

const value = ref('')
</script>

<template>
    <div class="h-full w-full">
        <!-- Contenu Markdown avec un padding inférieur pour éviter le chevauchement -->
        <div class="prose max-w-none p-4 pb-36 md:pb-40" v-html="markdownContent"></div>

        <!-- Élément fixe en bas de la page -->
        <div
            class="fixed flex bottom-0 w-full h-28 border-t dark:bg-neutral-900 bg-neutral-100 px-4 py-4 dark:border-neutral-800">
            <div>
                <h1 class="font-semibold text-lg">Answers area</h1>
                <div class="w-96 text-neutral-50 flex gap-2">
                    <UInput v-model="value" class="text-white-50" />
                    <UButton label="Submit" />
                </div>
            </div>
        </div>
    </div>
</template>
