<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="px-6 py-8">
          <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-white">Login</h2>
          <form @submit.prevent="handleLogin">
            <div class="mt-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                class="w-full px-4 py-2 text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div class="mt-4">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                v-model="password"
                required
                class="w-full px-4 py-2 text-gray-800 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <button
              type="submit"
              class="w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
        <div class="px-6 py-4 bg-gray-50 rounded-b-lg dark:bg-gray-700">
          <p class="text-sm text-center text-gray-600 dark:text-gray-300">
            Not account yet ?
            <a href="/register" class="text-blue-500 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Remplacez par votre logique de login (appel à l'API, validation, etc.)
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles optionnels supplémentaires si nécessaire */
  </style>
  