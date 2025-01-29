<script setup>
defineProps({ content: String });
</script>

<template>
    <div v-if="content" class="prose prose-lg prose-blue dark:prose-invert max-w-none p-4 pb-36 md:pb-40"
        v-html="content"></div>
    <div v-else class="text-center text-red-500 py-10">Challenge introuvable.</div>
</template>
