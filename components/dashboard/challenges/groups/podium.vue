<script setup lang="ts">
</script>

<template>
  <div class="my-8">
    <UCard>
      <h1 class="text-xl mb-3">Podium of the best squads</h1>
      <ul class="flex gap-8 justify-center items-end">
        <li>
          <div
            class="flex flex-col items-center justify-between text-center h-[150px] bg-white-50/20 p-4 rounded border border-neutral-800">
            <UBadge label="1029" color="primary" variant="soft" />
            <div>
              <h1 class="mb-2">Group name</h1>
              <UButton variant="ghost" label="View" icon="i-lucide-send-horizontal" size="sm" />
            </div>
          </div>
        </li>
        <li>
          <div
            class="flex flex-col items-center justify-between text-center h-[300px] bg-white-50/20 p-4 rounded border border-neutral-800">
            <UBadge label="1029" color="primary" variant="soft" />
            <div>
              <h1 class="mb-2">Group name</h1>
              <UButton variant="ghost" label="View" icon="i-lucide-send-horizontal" size="sm" />
            </div>
          </div>
        </li>
        <li>
          <div
            class="flex flex-col items-center justify-between text-center h-[200px] bg-white-50/20 p-4 rounded border border-neutral-800">
            <UBadge label="1029" color="primary" variant="soft" />
            <div>
              <h1 class="mb-2">Group name</h1>
              <UButton variant="ghost" label="View" icon="i-lucide-send-horizontal" size="sm" />
            </div>
          </div>
        </li>
      </ul>
    </UCard>
  </div>
</template>
