import { defineStore } from "pinia"
import { useUser } from "#imports" // Utilise Nuxt Auth

export const useChallengeStore = defineStore("challengeStore", {
  state: () => ({
    challenge: null,
    submission: null,
    cluesUsed: [], // Stocke les indices sous forme de ["easy", "medium"]
    userScore: 0,
    showVictoryModal: false,
    isChallengeCompleted: false,
    errorMessage: null,
    isLoading: false,
  }),

  actions: {
    async fetchChallengeById(challengeId) {
      const { user, isSignedIn, isLoaded } = useUser()
      console.log("Utilisateur connecté :", user.value.id) // Debug

      if (!isSignedIn.value) {
        console.error("Utilisateur non connecté.")
        return
      }

      console.log(`Fetching challenge with ID: ${challengeId}`) // Debug
      this.isLoading = true
      try {
        const response = await fetch(`http://localhost:3000/api/challenges/${challengeId}`)
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

        const data = await response.json()
        console.log("Challenge récupéré :", data)

        this.challenge = data
        this.userScore = data.basePoints
        this.cluesUsed = []
        this.isChallengeCompleted = false
        this.errorMessage = null

        // Vérifier ou créer une submission
        await this.checkOrCreateSubmission(user.value.id, challengeId)
      } catch (err) {
        console.error("Erreur lors de la récupération du challenge :", err.message)
        this.errorMessage = "Impossible de charger le challenge. Réessayez plus tard."
      } finally {
        this.isLoading = false
      }
    },

    async checkOrCreateSubmission(userId, challengeId) {
      try {
        console.log(`🔎 Vérification de la submission pour user: ${userId}, challenge: ${challengeId}`)

        const response = await fetch(`http://localhost:3000/api/submissions/user/${userId}/challenge/${challengeId}`)
        const data = await response.json()

        console.log("📥 Réponse API :", data) // Debug

        // ✅ Vérifier si une submission existe déjà
        if (data.submissions && data.submissions.length > 0) {
          console.log("✅ Submission existante trouvée :", data.submissions[0])

          this.submission = data.submissions[0] // ✅ Stocker la soumission
          this.userScore = this.submission.pointsEarned || this.userScore
          this.cluesUsed = Array.isArray(this.submission.hintsUsed) ? this.submission.hintsUsed : []

          // ✅ Ajoute cette ligne pour mettre à jour `isChallengeCompleted`
          this.isChallengeCompleted = this.submission.status === "completed"
          console.log("🎯 isChallengeCompleted mis à jour :", this.isChallengeCompleted)

          return // ✅ Arrêter ici, pas besoin de créer une nouvelle submission
        }

        console.log("🔄 Aucune submission trouvée, création d'une nouvelle...")

        const newSubmission = {
          userId,
          challengeId,
          status: "in_progress",
          hintsUsed: [],
          attemptCount: 0,
          pointsEarned: this.userScore,
        }

        const createResponse = await fetch("http://localhost:3000/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSubmission),
        })

        if (!createResponse.ok) {
          throw new Error(`Erreur lors de la création de la submission: ${createResponse.status}`)
        }

        const createdSubmission = await createResponse.json()
        console.log("✅ Submission créée :", createdSubmission)

        this.submission = createdSubmission.submission
        console.log("📌 Nouvelle submission stockée dans le store :", this.submission)
      } catch (err) {
        console.error("❌ Erreur lors de la vérification/création de la submission :", err.message)
      }
    },
    async updateSubmission() {
      if (!this.submission || !this.submission._id) {
        console.error("❌ Impossible de mettre à jour la submission : ID manquant !")
        return
      }

      try {
        const updatedSubmission = {
          status: this.submission.status, // ✅ Envoie bien "completed" si la réponse est bonne
          hintsUsed: this.cluesUsed.map((c) => ({ hintType: String(c.hintType) })),
          attemptCount: this.submission.attemptCount,
          pointsEarned: this.userScore,
        }

        console.log("📤 Données envoyées pour updateSubmission:", JSON.stringify(updatedSubmission, null, 2))

        const response = await fetch(`http://localhost:3000/api/submissions/${this.submission._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedSubmission),
        })

        if (!response.ok) {
          throw new Error(`Erreur lors de la mise à jour: ${response.status}`)
        }

        const updatedData = await response.json()
        console.log("✅ Submission mise à jour :", updatedData)

        this.submission = updatedData
      } catch (err) {
        console.error("❌ Erreur lors de la mise à jour de la submission :", err.message)
      }
    },
    useClue(clueID) {
      if (!this.isChallengeCompleted && this.challenge) {
        console.log("Tentative d'utilisation de l'indice :", clueID)
        const clue = this.challenge.clues[clueID]

        if (clue && !this.cluesUsed.some((c) => c.hintType === clueID.toString())) {
          // ✅ S'assurer que le score ne descend pas sous 0
          this.userScore = Math.max(0, this.userScore - clue.value)

          this.cluesUsed.push({ hintType: String(clueID) })
          this.challenge.cluesUsed = [...this.cluesUsed.map((c) => c.hintType)]

          console.log(`Indice ${clueID} utilisé, nouveaux points :`, this.userScore)
          this.updateSubmission() // Mettre à jour la soumission après utilisation d'un indice
        }
      }
    },
    checkAnswer(userAnswer) {
      if (!this.challenge) return

      if (userAnswer.trim().toLowerCase() === this.challenge.answer.toLowerCase()) {
        this.showVictoryModal = true
        this.isChallengeCompleted = true

        // ✅ Mettre à jour le statut de la submission
        this.submission.status = "completed"

        console.log("🎉 Réponse correcte ! Statut mis à jour en 'completed'")

        this.updateSubmission() // ✅ Met à jour la soumission en base de données
      } else {
        this.submission.attemptCount = (this.submission.attemptCount || 0) + 1
        const penalty = this.submission.attemptCount * 5

        // ✅ S'assurer que le score ne descend pas sous 0
        this.userScore = Math.max(0, this.userScore - penalty)

        alert(`Mauvaise réponse ❌ ! -${penalty} points. Réessaie.`)
        this.updateSubmission() // ✅ Met à jour la soumission après tentative
      }
    },
  },

  getters: {
    cluesAvailable: (state) => {
      return state.challenge ? state.challenge.clues.map((c) => c.textEnigme) : []
    },
    getChallengeById: (state) => {
      return state.challenge
    },
  },
})
