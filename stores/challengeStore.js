import { defineStore } from "pinia"

export const useChallengeStore = defineStore("challenge", {
  state: () => ({
    challenges: [
      {
        _id: "65a1b2c3d4e5f6g7h8i9j0",
        title: "Introduction à la Cryptographie",
        subtitle: "Comprendre les bases du chiffrement",
        difficulty: "easy",
        content: `
        # Introduction à la Cryptographie
        
        La cryptographie est l'art de sécuriser les communications à travers des techniques de chiffrement. Voici quelques concepts fondamentaux :`,
        basePoints: 55,
        clues: [
          {
            id: "easy",
            clueLabel: "Décryptez ce message : ZHOFRPH WR FUBSWRJUDSKB.",
            value: 10,
          },
          {
            id: "medium",
            clueLabel: "Quel est l'équivalent ROT13 de 'HELLO' ?",
            value: 20,
          },
          {
            id: "hard",
            clueLabel: "Décryptez 'PBHEFR BS PBAQVGVBA' en utilisant ROT13.",
            value: 30,
          },
        ],
        response: "test", // La bonne réponse
        attempts: 0, // Nombre de tentatives
      },
    ],
    cluesUsed: [],
    cluesAvailable: ["easy", "medium", "hard"],
    userScore: 55, // Points initiaux
    showVictoryModal: false, // Modal de victoire
    isChallengeCompleted: false, // Bloque les interactions après la victoire
  }),
  actions: {
    useClue(clueID) {
      if (!this.isChallengeCompleted) {
        const challenge = this.challenges[0]
        const clue = challenge.clues.find((c) => c.id === clueID)

        if (clue && !this.cluesUsed.includes(clueID)) {
          this.userScore -= clue.value
          this.cluesUsed.push(clueID)
        }
      }
    },
    checkAnswer(userAnswer) {
      const challenge = this.challenges[0] // Supposons un seul challenge
      if (userAnswer.trim().toLowerCase() === challenge.response.toLowerCase()) {
        this.showVictoryModal = true // Ouvre la modal de victoire
        this.isChallengeCompleted = true // Bloque l'input et les indices
      } else {
        challenge.attempts += 1
        const penalty = challenge.attempts * 5 // Augmente la pénalité à chaque tentative
        this.userScore -= penalty
        alert(`Mauvaise réponse ❌ ! -${penalty} points. Réessaie.`)
      }
    },
    closeVictoryModal() {
      this.showVictoryModal = false
    },
  },
  getters: {
    getChallengeById: (state) => (id) => {
      return state.challenges.find((challenge) => challenge._id === id)
    },
  },
})
