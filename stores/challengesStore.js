export const useChallengesStore = defineStore("challengesStore", {
  state: () => ({
    challenges: [],
    submissions: [],
    isLoaded: false, // ✅ Indique si les challenges sont chargés
    isSubmissionsLoaded: false, // ✅ Indique si les submissions sont chargées
    errorMessage: null,
    userScore: 0,
  }),

  actions: {
    async fetchChallenges() {
      try {
        const response = await fetch("http://localhost:3000/api/challenges")
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

        const data = await response.json()
        this.challenges = data.challenges || []
        this.isLoaded = true // Mise à jour de isLoaded une fois les données récupérées
      } catch (err) {
        console.error("Erreur lors du chargement des défis:", err.message)
        this.errorMessage = "Impossible de charger les défis."
      }
    },

    async fetchSubmissions(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/submissions/user/${userId}`)
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

        const data = await response.json()
        this.submissions = data.submissions || []
        this.isSubmissionsLoaded = true

        this.userScore =
          this.submissions.length > 0 ? this.submissions.reduce((total, sub) => total + (sub.pointsEarned || 0), 0) : 0
      } catch (err) {
        console.error("Erreur lors du chargement des submissions:", err.message)
        this.submissions = []
        this.userScore = 0
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

    getChallengesByStatus: (state) => (userId, status) => {
      return state.challenges.filter((challenge) => {
        const submission = state.submissions.find((sub) => sub.challengeId === challenge._id && sub.userId === userId)
        if (!submission) return status === "New"
        return submission.status === status
      })
    },
  },
})
