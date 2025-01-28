<template>
    <div class="my-2">
        <UCard class="rounded border border-transparent hover:border-primary-500 transition">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 bg-primary-500 rounded"></div>
                    <div>
                        <h1 class="text-lg font-semibold">Squad name</h1>
                        <p class="text-sm">Squad description</p>
                    </div>
                </div>
                <div>
                    <UButton label="Join" icon="i-lucide-plus" variant="ghost" />
                </div>
            </div>
        </UCard>
    </div>
</template>