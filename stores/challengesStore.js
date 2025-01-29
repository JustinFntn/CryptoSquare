import { defineStore } from "pinia"

export const useChallengesStore = defineStore("challenges", {
  state: () => ({
    challenges: [
      {
        _id: "65a1b2c3d4e5f6g7h8i9j0",
        title: "Introduction à la Cryptographie",
        subtitle: "Comprendre les bases du chiffrement",
        difficulty: "easy",
        content: `
# Introduction à la Cryptographie

La cryptographie est l'art de sécuriser les communications à travers des techniques de chiffrement. Voici quelques concepts fondamentaux :

## 🛠️ Les Bases des Chiffres Classiques

Avant l'avènement des ordinateurs, les messages étaient sécurisés grâce à des méthodes simples mais efficaces :

1. **Chiffre de César** : Décale chaque lettre de l'alphabet d'un nombre fixe.
2. **ROT13** : Variante du chiffre de César avec un décalage de 13 positions.
3. **Chiffre de Vigenère** : Utilise un mot-clé pour encoder un message.

### 🔑 Exemple de Chiffre de César (Décalage de 3)
- **Texte clair** : "HELLO"
- **Texte chiffré** : "KHOOR"

## 🔍 Défi : Décrypter un message

Voici un message chiffré en ROT13 :
\`\`\`
PBHEFR BS PBAQVGVBA
\`\`\`
Peux-tu le décrypter ? 🤔

## 🎯 Objectif

Votre mission est de comprendre et appliquer ces concepts pour décrypter des messages en utilisant les chiffres classiques.

Bonne chance ! 🚀
        `,
        basePoints: 50,
        clues: [
          {
            textEnigme: "Décryptez ce message : ZHOFRPH WR FUBSWRJUDSKB.",
            value: 10,
          },
          {
            textEnigme: "Quel est l'équivalent ROT13 de 'HELLO' ?",
            value: 20,
          },
          {
            textEnigme: "Décryptez 'PBHEFR BS PBAQVGVBA' en utilisant ROT13.",
            value: 30,
          },
        ],
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
    completeChallenge(userID) {},
    getClue(userID, challengeID) {},
  },
  getters: {
    challengeCount: (state) => state.challenges.length,
    getChallengesByDifficulty: (state) => (difficulty) => {
      return state.challenges.filter((challenge) => challenge.difficulty === difficulty)
    },
    getCompletedChallenges: (state) => {
      return state.challenges.filter((challenge) => challenge.isCompleted)
    },
    getChallengeById: (state) => (id) => {
      return state.challenges.find((challenge) => challenge._id === id)
    },
  },
})
