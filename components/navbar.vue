<template>
  <UContainer class="sticky flex py-3 top-0 z-50 items-center gap-3 backdrop-blur-xl">
    <Logo class="pr-4" />
    <SignedIn>
      <UHorizontalNavigation :links="links" :ui="uiConfig" />
    </SignedIn>
    <SignedOut>
      <UHorizontalNavigation :links="links.filter(link => link.label !== 'Dashboard')" :ui="uiConfig" />
    </SignedOut>
    <ThemeSelector />
    <UDivider orientation="vertical" class="h-8 bg-gray-200 dark:bg-gray-700" />
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton class="w-[70px]" mode="modal" />
    </SignedOut>
  </UContainer>
</template>

<script setup lang="ts">
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  }, {
    label: 'About',
    icon: 'i-heroicons-information-circle',
    to: '/about'
  }, {
    label: 'Dashboard',
    icon: 'i-heroicons-academic-cap',
    to: '/dashboard'
  }
]

const uiConfig = {
  active: 'dark:text-white',
}
</script>
