<template>
    <div class="my-4">
        <UContainer>
            <div>
                <h1 class=" text-xl text-primary-500 font-semibold">Crypto Squads</h1>
                <p class="text-neutral-500">Join a clan to top the rankings.</p>
                <UDivider class="my-4" />
                <div class="flex justify-between">
                    <UInput color="primary" variant="outline" placeholder="Search..." />
                    <UButton label="Create a squad" icon="i-lucide-circle-plus" variant="outline"
                        to="/dashboard/groups/new" />
                </div>
                <div>
                    <DashboardChallengesGroupsCard />
                </div>
            </div>
        </UContainer>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "user",
})
</script>
