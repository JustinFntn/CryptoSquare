<template>
  <div class="bg-slate-800 px-4 py-4 h-screen flex flex-col">
    <div class="flex gap-2 items-center hover:bg-neutral-900 rounded px-4 py-2 cursor-pointer">
      <div class="bg-neutral-500 h-9 w-9 rounded-full"></div>
      <div>
        <p class="font-semibold">username</p>
        <p class="text-sm text-neutral-500">email@example.com</p>
      </div>
    </div>
    <div class="flex-grow border-t mt-2 border-neutral-500">
      <ul class="w-full">
        <li v-for="link in linksTop" :key="link.label" class="w-full">
          <NuxtLink
            :to="link.link"
            class="flex w-full gap-3 items-center px-4 py-1 my-2 hover:bg-neutral-900 rounded transition"
          >
            <UIcon :name="link.icon" />
            <h3>{{ link.label }}</h3>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div>
      <ul class="w-full">
        <li v-for="link in linksButtom" :key="link.label" class="w-full">
          <NuxtLink
            :to="link.link"
            class="flex w-full gap-3 items-center px-4 py-1 my-2 hover:bg-neutral-900 rounded transition"
          >
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

const linksTop = ref([
  { label: "Home", icon: "i-lucide-house", link: "/dashboard" },
  { label: "Profile", icon: "i-lucide-user", link: "/profile" },
  { label: "Groups", icon: "i-lucide-waypoints", link: "/groups" },
  { label: "Challenges", icon: "i-lucide-brain-circuit", link: "/challenges" },
])

const linksButtom = ref([
  { label: "Logout", icon: "i-lucide-log-out", link: "/" },
  { label: "Preferences", icon: "i-lucide-settings", link: "/preferences" },
  { label: "Help", icon: "i-lucide-circle-help", link: "/help" },
])
</script>
