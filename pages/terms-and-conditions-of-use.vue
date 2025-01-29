<template>
  <UContainer>

    <div class="min-h-screen my-20 text-white flex items-center justify-center p-4">
      <div class="prose prose-invert max-w-4xl">
        <h1 class="text-4xl font-bold">Conditions Générales d'Utilisation</h1>
        <p>Date de dernière mise à jour : <span>{{ updatedAt }}</span></p>
        <section>
          <h2>1. Présentation du Service</h2>
          <p>
            Crypto Squad est une application de jeu en ligne spécialisée dans les énigmes et défis de cryptographie. Les
            joueurs peuvent explorer des missions, résoudre des casse-tête et rivaliser avec d'autres joueurs.
          </p>
        </section>
        <section>
          <h2>2. Accès au Service</h2>
          <ul>
            <li><strong>Âge minimum :</strong> Vous devez avoir au moins 13 ans pour utiliser Crypto Squad. Si vous avez
              entre 13 et 18 ans, l'accord parental est nécessaire.</li>
            <li><strong>Inscription :</strong> Certaines fonctionnalités nécessitent la création d’un compte. Vous êtes
              responsable des informations fournies et de la sécurité de vos identifiants.</li>
            <li><strong>Restrictions :</strong> L’accès peut être restreint ou suspendu en cas de violation des
              présentes
              CGU.</li>
          </ul>
        </section>
        <section>
          <h2>3. Règles d’utilisation</h2>
          <p>En utilisant Crypto Squad, vous acceptez de :</p>
          <ul>
            <li>Respecter les lois et réglementations en vigueur.</li>
            <li>Ne pas tenter de contourner ou compromettre les mesures de sécurité de l’application.</li>
            <li>Ne pas utiliser Crypto Squad à des fins illicites, frauduleuses ou nuisibles.</li>
            <li>Respecter les autres joueurs et éviter tout comportement inapproprié, harcèlement ou diffamation.</li>
          </ul>
        </section>
        <section>
          <h2>4. Propriété intellectuelle</h2>
          <p>
            Tous les éléments de l’application (textes, graphiques, logos, designs, etc.) sont la propriété exclusive de
            Crypto Squad ou de ses partenaires.
          </p>
        </section>
        <section>
          <h2>5. Responsabilités</h2>
          <p>
            Crypto Squad s’efforce de fournir un accès continu à l’application, mais ne garantit pas l’absence
            d’interruptions ou d’erreurs.
          </p>
        </section>
        <section>
          <h2>6. Données personnelles</h2>
          <p>
            Vos données sont collectées et traitées conformément à notre Politique de Confidentialité.
          </p>
        </section>
        <section>
          <h2>7. Modification des CGU</h2>
          <p>
            Crypto Squad se réserve le droit de modifier les présentes CGU à tout moment. Les modifications seront
            communiquées via l’application ou par e-mail.
          </p>
        </section>
        <section>
          <h2>8. Résiliation</h2>
          <p>
            Vous pouvez mettre fin à votre utilisation de Crypto Squad à tout moment. Crypto Squad se réserve le droit
            de
            suspendre ou de supprimer votre compte en cas de violation des CGU.
          </p>
        </section>
        <section>
          <h2>9. Contact</h2>
          <p>
            Pour toute question ou assistance, veuillez nous contacter à :
          </p>
          <ul>
            <li><strong>E-mail :</strong> support@cryptosquad.com</li>
          </ul>
        </section>
      </div>
    </div>
  </UContainer>
</template>

<script>
export default {
  data() {
    return {
      updatedAt: '2025-01-28', // Remplacez par une date dynamique si nécessaire
    };
  },
};
</script>

<style>
/**** La couleur primary-500 est gérée via Tailwind CSS ****/
</style>
