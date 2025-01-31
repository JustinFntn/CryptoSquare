import { defineStore } from "pinia"

export const useChallengeStore = defineStore("challengeStore", {
  state: () => ({
    challenge: null,
    submission: null,
    cluesUsed: [],
    userScore: 0,
    showVictoryModal: false,
    isChallengeCompleted: false,
    errorMessage: null,
    isLoading: false,
  }),

  actions: {
    async fetchChallengeById(challengeId, userId) {
      if (!userId) {
        console.error("Utilisateur non connecté (userId manquant).")
        return
      }

      console.log(`Fetching challenge with ID: ${challengeId}`)
      this.isLoading = true
      try {
        const response = await fetch(`https://cryptosquare.csquare.dev/api/challenges/${challengeId}`)
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

        const data = await response.json()
        console.log("Challenge récupéré :", data)

        this.challenge = data
        this.userScore = data.basePoints
        this.cluesUsed = []
        this.isChallengeCompleted = false
        this.errorMessage = null

        await this.checkOrCreateSubmission(userId, challengeId)
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

        const response = await fetch(`https://cryptosquare.csquare.dev/api/submissions/user/${userId}/challenge/${challengeId}`)
        const data = await response.json()

        console.log("📥 Réponse API :", data)

        if (data.submissions && data.submissions.length > 0) {
          console.log("✅ Submission existante trouvée :", data.submissions[0])

          this.submission = data.submissions[0]
          this.userScore = this.submission.pointsEarned
          console.log("🎯 userScore mis à jour :", this.submission.pointsEarned)
          console.log("🎯 userScore mis à jour :", this.userScore)
          this.cluesUsed = Array.isArray(this.submission.hintsUsed) ? this.submission.hintsUsed : []

          this.isChallengeCompleted = this.submission.status === "completed"
          console.log("🎯 isChallengeCompleted mis à jour :", this.isChallengeCompleted)

          return
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

        const createResponse = await fetch("https://cryptosquare.csquare.dev/api/submissions", {
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
          status: this.submission.status,
          hintsUsed: this.cluesUsed.map((c) => ({ hintType: String(c.hintType) })),
          attemptCount: this.submission.attemptCount,
          pointsEarned: this.userScore,
        }

        console.log("📤 Données pour updateSubmission:", JSON.stringify(updatedSubmission, null, 2))

        const response = await fetch(`https://cryptosquare.csquare.dev/api/submissions/${this.submission._id}`, {
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
          this.userScore = Math.max(0, this.userScore - clue.value)

          this.cluesUsed.push({ hintType: String(clueID) })
          this.challenge.cluesUsed = [...this.cluesUsed.map((c) => c.hintType)]

          console.log(`Indice ${clueID} utilisé, nouveaux points :`, this.userScore)
          this.updateSubmission()
        }
      }
    },

    checkAnswer(userAnswer) {
      if (!this.challenge) return

      if (userAnswer.trim().toLowerCase() === this.challenge.answer.toLowerCase()) {
        this.showVictoryModal = true
        this.isChallengeCompleted = true
        this.submission.status = "completed"
        this.updateSubmission()
        return { success: true }
      } else {
        this.submission.attemptCount = (this.submission.attemptCount || 0) + 1
        const penalty = 3

        this.userScore = Math.max(0, this.userScore - penalty)
        this.updateSubmission()
        return { success: false, penalty }
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
