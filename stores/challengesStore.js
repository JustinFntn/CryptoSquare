import { defineStore } from "pinia"

export const useChallengesStore = defineStore("challenges", {
  state: () => ({
    challenges: [
      {
        id: 1,
        title: "Challenge 1",
        difficulty: "easy",
        description: "Introduction to Crypto",
        content: "Solve this basic cryptography puzzle.",
        requestedAnswer: "answer1",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Justin mange mes couilles",
        difficulty: "medium",
        description: "Intermediate Crypto",
        content: "Solve this intermediate cryptography puzzle.",
        requestedAnswer: "answer2",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Challenge 3",
        difficulty: "hard",
        description: "Advanced Crypto",
        content: "Solve this advanced cryptography puzzle.",
        requestedAnswer: "answer3",
        isCompleted: false,
      },
    ],
  }),
  actions: {
    addChallenge(challenge) {
      this.challenges.push(challenge)
    },
    removeChallenge(index) {
      this.challenges.splice(index, 1)
    },
    clearChallenges() {
      this.challenges = []
    },
  },
  getters: {
    challengeCount: (state) => state.challenges.length,
    getChallengesByDifficulty: (state) => (difficulty) => {
      return state.challenges.filter((challenge) => challenge.difficulty === difficulty)
    },
    getCompletedChallenges: (state) => {
      return state.challenges.filter((challenge) => challenge.isCompleted)
    },
  },
})
