<template>
  <UContainer class="min-h-screen my-20 flex items-center justify-center p-4 dark:text-white">
    <div class="prose max-w-4xl">
      <h1 class="text-4xl font-bold text-primary-400">Terms and Conditions of Use</h1>
      <p class="dark:text-white">Last updated: <span class="dark:text-primary-100">{{ updatedAt }}</span></p>
      <section>
        <h2 class="text-primary-300">1. Service Overview</h2>
        <p class="dark:text-white">
          Crypto Square is an online gaming application specializing in cryptography puzzles and challenges. Players can
          explore missions, solve puzzles, and compete with other players.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">2. Access to the Service</h2>
        <ul>
          <li class="dark:text-white"><strong class="dark:text-primary-200">Minimum Age:</strong> You must be at least
            13 years old to use Crypto Square. If you are between 13 and 18 years old, parental consent is required.
          </li>
          <li class="dark:text-white"><strong class="dark:text-primary-200">Registration:</strong> Some features require
            creating an account. You are responsible for the information provided and the security of your credentials.
          </li>
          <li class="dark:text-white"><strong class="dark:text-primary-200">Restrictions:</strong> Access may be
            restricted or suspended in case of violation of these terms.</li>
        </ul>
      </section>
      <section>
        <h2 class="text-primary-300">3. Rules of Use</h2>
        <p class="dark:text-white">By using Crypto Square, you agree to:</p>
        <ul>
          <li class="dark:text-white">Comply with applicable laws and regulations.</li>
          <li class="dark:text-white">Not attempt to bypass or compromise the application's security measures.</li>
          <li class="dark:text-white">Not use Crypto Square for illegal, fraudulent, or harmful purposes.</li>
          <li class="dark:text-white">Respect other players and avoid inappropriate behavior, harassment, or defamation.
          </li>
        </ul>
      </section>
      <section>
        <h2 class="text-primary-300">4. Intellectual Property</h2>
        <p class="dark:text-white">
          All elements of the application (texts, graphics, logos, designs, etc.) are the exclusive property of Crypto
          Square or its partners.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">5. Responsibilities</h2>
        <p class="dark:text-white">
          Crypto Square strives to provide continuous access to the application but does not guarantee the absence of
          interruptions or errors.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">6. Personal Data</h2>
        <p class="dark:text-white">
          Your data is collected and processed in accordance with our Privacy Policy.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">7. Modification of Terms</h2>
        <p class="dark:text-white">
          Crypto Square reserves the right to modify these terms at any time. Changes will be communicated via the
          application or by email.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">8. Termination</h2>
        <p class="dark:text-white">
          You can terminate your use of Crypto Square at any time. Crypto Square reserves the right to suspend or delete
          your account in case of violation of these terms.
        </p>
      </section>
      <section>
        <h2 class="text-primary-300">9. Contact</h2>
        <p class="dark:text-white">
          For any questions or assistance, please contact us at:
        </p>
        <ul>
          <li class="dark:text-white"><strong class="dark:text-primary-200">Email:</strong> support@cryptosquare.com
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
