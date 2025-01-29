<template>
  <UContainer class="py-7 max-w-5xl mx-auto">
    <h1 class="text-center text-4xl font-bold text-primary-400 mb-4">Bienvenue sur CryptoSquare</h1>
    <UCard :ui="uiCardConfig">
      <h1 class="text-2xl font-semibold text-primary-300 mb-4">Notre Mission</h1>

      <p class="">
        Chez CryptoSquare, nous croyons que l'apprentissage de la cryptographie devrait être aussi passionnant
        qu'enrichissant. Notre plateforme combine le meilleur des deux mondes : l'excitation des jeux d'énigmes et
        l'acquisition de connaissances en cryptographie.
      </p>
    </UCard>

    <h2 class="text-2xl font-semibold text-primary-300 mt-8 mb-2">Ce qui nous rend uniques</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <UCard :ui="uiCardConfig">
        <h3 class="text-xl font-medium text-primary-200 mb-3">Une expérience d'apprentissage gamifiée</h3>
        <p class="">Plongez dans un monde d'énigmes cryptographiques soigneusement conçues pour tous
          les niveaux. Chaque défi vous rapproche un peu plus des secrets de la cryptographie, tout en vous
          permettant de gagner des points et de grimper dans le classement.</p>
      </UCard>
      <UCard :ui="uiCardConfig">
        <h3 class="text-xl font-medium text-primary-200 mb-3">Une expérience d'apprentissage gamifiée</h3>
        <p class="">Plongez dans un monde d'énigmes cryptographiques soigneusement conçues pour tous
          les niveaux. Chaque défi vous rapproche un peu plus des secrets de la cryptographie, tout en vous
          permettant de gagner des points et de grimper dans le classement.</p>
      </UCard>
      <UCard :ui="uiCardConfig">
        <h3 class="text-xl font-medium text-primary-200 mb-3">Une expérience d'apprentissage gamifiée</h3>
        <p class="">Plongez dans un monde d'énigmes cryptographiques soigneusement conçues pour tous
          les niveaux. Chaque défi vous rapproche un peu plus des secrets de la cryptographie, tout en vous
          permettant de gagner des points et de grimper dans le classement.</p>
      </UCard>
      <UCard :ui="uiCardConfig">
        <h3 class="text-xl font-medium text-primary-200 mb-3">Une expérience d'apprentissage gamifiée</h3>
        <p class="">Plongez dans un monde d'énigmes cryptographiques soigneusement conçues pour tous
          les niveaux. Chaque défi vous rapproche un peu plus des secrets de la cryptographie, tout en vous
          permettant de gagner des points et de grimper dans le classement.</p>
      </UCard>
    </div>

    <div class="text-center">
      <h2 class="text-2xl font-semibold text-primary-300 mt-8">Rejoignez l'aventure</h2>
      <p class=" mb-6">Prêt à relever le défi ? Inscrivez-vous dès maintenant et commencez votre voyage
        dans l'univers fascinant de la cryptographie. Chaque énigme résolue vous rapproche un peu plus de la maîtrise
        de cet art ancestral.</p>
      <p class="text-xl font-medium text-primary-400">La cryptographie n'attend que vous !</p>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const uiCardConfig: object = {
  base: `basis-1/2 m-2`,
  background: "bg-gray-200 dark:bg-gray-900",
}
</script>
