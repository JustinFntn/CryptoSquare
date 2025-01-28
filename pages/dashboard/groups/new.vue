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
            <DashboardChallengesGroupsPicturePicker />
            <UButton label="Create" variant="outline" icon="i-lucide-plus" />
        </UContainer>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'user'
})
</script>