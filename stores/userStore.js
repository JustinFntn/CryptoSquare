import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => ({
    userID: "",
    userGroupID: "",
  }),

  actions: {
    async fetchOrCreateUser(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`)

        if (response.status === 404) {
          console.log("Utilisateur introuvable, création en cours...")
          return await this.createUser(userId)
        }

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Status: ${response.status}`)
        }

        const text = await response.text() // Récupération du texte brut
        if (!text) {
          console.warn("Réponse vide reçue de l'API, création de l'utilisateur...")
          return await this.createUser(userId)
        }

        const data = JSON.parse(text) // Parsing JSON
        this.setUserData(data)
        console.log("Utilisateur récupéré avec succès:", data)
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error)
      }
    },

    async createUser(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: userId }),
        })

        if (!response.ok) {
          throw new Error(`Erreur HTTP! Status: ${response.status}`)
        }

        const text = await response.text()
        if (!text) {
          throw new Error("Réponse vide lors de la création de l'utilisateur")
        }

        const data = JSON.parse(text)
        this.setUserData(data)
        console.log("Utilisateur créé avec succès:", data)
        return data
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error)
      }
    },

    async assignUserToGroup(groupID) {
      try {
        if (!this.userID) {
          throw new Error("userID non défini dans le store")
        }

        const response = await fetch(`http://localhost:3000/api/users/${this.userID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ groupId: groupID }),
        })

        if (!response.ok) throw new Error("Erreur lors de l'assignation de l'utilisateur au groupe")

        const updatedUser = await response.json()
        this.userGroupID = updatedUser.groupId
        console.log("Utilisateur assigné au groupe avec succès:", updatedUser)
      } catch (error) {
        console.error("Erreur lors de l'assignation de l'utilisateur au groupe:", error)
      }
    },
    setUserData(data) {
      console.log("setUserData....", data)
      this.userID = data._id // ✅ Prendre `_id` et non `id`
      this.userGroupID = data.groupId || ""
    },
  },
})
