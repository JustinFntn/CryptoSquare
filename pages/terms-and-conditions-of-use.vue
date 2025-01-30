<template>
  <UContainer class="min-h-screen my-20 flex items-center justify-center p-4 dark:text-white">
    <div class="prose max-w-4xl">
      <h1 class="text-4xl font-bold text-primary-400">Conditions Générales d'Utilisation</h1>
      <p class="dark:text-white">Date de dernière mise à jour : <span class="dark:text-primary-100">{{ updatedAt
          }}</span>
      </p>
      <section>
        <h2 class="text-primary-300">1. Présentation du Service</h2>
        <p class="dark:text-white">
          Crypto Square est une application de jeu en ligne spécialisée dans les énigmes et défis de cryptographie.
          Les
          joueurs peuvent explorer des missions, résoudre des casse-tête et rivaliser avec d'autres joueurs.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">2. Accès au Service</h2>
        <ul>
          <li class="dark:text-white"><strong class="dark:text-primary-200">Âge minimum :</strong> Vous devez avoir au
            moins 13 ans pour
            utiliser Crypto Square. Si vous
            avez
            entre 13 et 18 ans, l'accord parental est nécessaire.</li>
          <li class="dark:text-white"><strong class="dark:text-primary-200">Inscription :</strong> Certaines
            fonctionnalités nécessitent la
            création d’un compte. Vous êtes
            responsable des informations fournies et de la sécurité de vos identifiants.</li>
          <li class="dark:text-white"><strong class="dark:text-primary-200">Restrictions :</strong> L’accès peut être
            restreint ou suspendu en
            cas de violation des
            présentes
            CGU.</li>
        </ul>
      </section>
      <section>
        <h2 class="text-primary-300">3. Règles d’utilisation</h2>
        <p class="dark:text-white">En utilisant Crypto Square, vous acceptez de :</p>
        <ul>
          <li class="dark:text-white">Respecter les lois et réglementations en vigueur.</li>
          <li class="dark:text-white">Ne pas tenter de contourner ou compromettre les mesures de sécurité de
            l’application.</li>
          <li class="dark:text-white">Ne pas utiliser Crypto Square à des fins illicites, frauduleuses ou nuisibles.
          </li>
          <li class="dark:text-white">Respecter les autres joueurs et éviter tout comportement inapproprié, harcèlement
            ou diffamation.</li>
        </ul>
      </section>
      <section>
        <h2 class="text-primary-300">4. Propriété intellectuelle</h2>
        <p class="dark:text-white">
          Tous les éléments de l’application (textes, graphiques, logos, designs, etc.) sont la propriété exclusive de
          Crypto Square ou de ses partenaires.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">5. Responsabilités</h2>
        <p class="dark:text-white">
          Crypto Square s’efforce de fournir un accès continu à l’application, mais ne garantit pas l’absence
          d’interruptions ou d’erreurs.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">6. Données personnelles</h2>
        <p class="dark:text-white">
          Vos données sont collectées et traitées conformément à notre Politique de Confidentialité.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">7. Modification des CGU</h2>
        <p class="dark:text-white">
          Crypto Square se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront
          communiquées via l’application ou par e-mail.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">8. Résiliation</h2>
        <p class="dark:text-white">
          Vous pouvez mettre fin à votre utilisation de Crypto Square à tout moment. Crypto Square se réserve le droit
          de
          suspendre ou de supprimer votre compte en cas de violation des CGU.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">9. Contact</h2>
        <p class="dark:text-white">
          Pour toute question ou assistance, veuillez nous contacter à :
        </p>
        <ul>
          <li class="dark:text-white"><strong class="dark:text-primary-200">E-mail :</strong> support@cryptosquare.com
          </li>
        </ul>
      </section>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const updatedAt = '2025-01-28';
</script>

<style>
/**** La couleur primary-500 est gérée via Tailwind CSS ****/
</style>
