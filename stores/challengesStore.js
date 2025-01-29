import { defineStore } from "pinia"

export const useChallengesStore = defineStore("challenges", {
  state: () => ({
    challenges: [],
    isLoaded: false, // Empêche de refetch plusieurs fois
    errorMessage: null, // Gère les erreurs
  }),
  actions: {
    async fetchChallenges() {
      if (this.isLoaded) return
      try {
        const response = await fetch("http://localhost:3000/api/challenges")
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

        const data = await response.json()
        console.log("Données récupérées :", data) // Vérifier le format des données

        // Extraire uniquement les défis
        if (!Array.isArray(data.challenges)) {
          throw new Error("Les données reçues ne contiennent pas un tableau de défis")
        }

        this.challenges = data.challenges
        this.isLoaded = true
        this.errorMessage = null
      } catch (err) {
        console.error("Erreur lors de la récupération des défis :", err.message)
        this.errorMessage = "Impossible de charger les défis. Réessayez plus tard."
      }
    },
  },
  getters: {
    challengeCount: (state) => state.challenges.length,
    getChallengesByDifficulty: (state) => (difficulty) => {
      return state.challenges.filter((challenge) => challenge.difficulty === difficulty)
    },
    getChallengeById: (state) => (id) => {
      return state.challenges.find((challenge) => challenge._id === id)
    },
  },
})
