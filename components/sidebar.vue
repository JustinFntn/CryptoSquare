<template>
  <div class="bg-neutral-100 dark:bg-neutral-900 py-4 h-screen flex flex-col min-w-40">
    <div class="flex justify-center w-full border-b mb-2 dark:border-neutral-800">
      <Logo class="mb-4 scale-[1.75]" />
    </div>
    <div
      class="flex gap-2 items-center hover:bg-primary-200 mx-1 px-2 dark:hover:bg-primary-900/50 rounded py-2 cursor-pointer">
      <UAvatar :src="user?.imageUrl || 'https://placehold.co/40x40'" />
      <div>
        <p class="font-semibold text-primary-500">{{ user?.username || 'username' }}</p>
        <p class="text-sm text-neutral-500">{{ user?.primaryEmailAddress.emailAddress || 'email@example.com' }}</p>
      </div>
    </div>
    <div class="flex-grow border-t mt-2 dark:border-neutral-800">
      <ul class="mx-1">
        <li v-for="link in linksTop" :key="link.label" class="w-full">
          <NuxtLink :to="link.link"
            class="flex gap-3 items-center px-4 py-1 my-2 hover:bg-primary-200 dark:hover:bg-primary-900/50 rounded transition">
            <UIcon :name="link.icon" />
            <h3>{{ link.label }}</h3>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="dark:border-neutral-800 border-t">
      <ul class="mx-1">
        <li v-for="link in linksBottom" :key="link.label" class="w-full">
          <NuxtLink :to="link.link"
            class="flex gap-3 items-center px-4 py-1 my-2 hover:bg-primary-200 dark:hover:bg-primary-900/50 rounded transition">
            <UIcon :name="link.icon" />
            <h3>{{ link.label }}</h3>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
const { user } = useUser()

const linksTop = ref([
  { label: "Dashboard", icon: "i-lucide-blocks", link: "/dashboard/" },
  { label: "Profile", icon: "i-lucide-user", link: "/dashboard/profile" },
  { label: "Groups", icon: "i-lucide-waypoints", link: "/dashboard/groups" },
  { label: "Challenges", icon: "i-lucide-brain-circuit", link: "/dashboard/challenges" },
  { label: "Create a challenge", icon: "i-lucide-pencil-line", link: "/dashboard/challenges/challenge-creator" },
])

const linksBottom = ref([
  { label: "Home", icon: "i-lucide-home", link: "/" },
  { label: "Preferences", icon: "i-lucide-settings", link: "/dashboard/preferences" },
  { label: "Help", icon: "i-lucide-circle-help", link: "/dashboard/help" },
])

const links = ref([
  { label: user.username, avatar: { src: user.avatar } },
]);
</script>
