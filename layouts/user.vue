<template>
  <div class="flex min-h-screen w-full overflow-x-hidden">
    <!-- Sidebar fixe -->
    <div class="h-screen bg-gray-800 text-white fixed">
      <Sidebar />
    </div>

    <!-- Zone principale (contenu des pages) -->
    <div class="flex-1 ml-64 overflow-auto">
      <NuxtPage />
    </div>

    <!-- Sélecteur de thème -->
    <ThemeSelector :is-fixed="true" />
  </div>
</template>

<script setup lang="ts">
//
</script>
