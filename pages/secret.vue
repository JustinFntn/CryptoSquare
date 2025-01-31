<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

const logoRef = ref(null);
const position = ref({ x: 100, y: 100 });
const velocity = ref({ x: 2, y: 2 });

let animationFrameId = null;

const moveLogo = () => {
  position.value.x += velocity.value.x;
  position.value.y += velocity.value.y;

  const logoSize = 80; // Taille du logo en px

  if (position.value.x + logoSize >= width.value || position.value.x <= 0) {
    velocity.value.x *= -1; // Inverse la direction en X
  }
  if (position.value.y + logoSize >= height.value || position.value.y <= 0) {
    velocity.value.y *= -1; // Inverse la direction en Y
  }

  animationFrameId = requestAnimationFrame(moveLogo);
};

onMounted(() => {
  animationFrameId = requestAnimationFrame(moveLogo);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
});

definePageMeta({
  layout: "secret"
})
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <img ref="logoRef" src="/secret/img/secret.png" alt="DVD Logo" class="absolute w-[100px] h-[100px]"
      :style="{ transform: `translate(${position.x}px, ${position.y}px)` }" />
  </div>
</template>
