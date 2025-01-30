import { defineStore } from "pinia"
import { useUserStore } from "@/stores/userStore" // Importer le store utilisateur

export const useGroupsStore = defineStore("groups", {
  state: () => ({
    groups: [],
  }),
  actions: {
    async fetchAllGroups() {
      try {
        const response = await fetch("http://localhost:3000/api/groups")
        const data = await response.json()
        this.groups = data.groups
      } catch (error) {
        console.error("Error fetching groups:", error)
      }
    },

    async createGroup(group) {
      try {
        const response = await fetch("http://localhost:3000/api/groups", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(group),
        })

        if (!response.ok) throw new Error("Erreur lors de la création du groupe")

        const createdGroup = await response.json()

        console.log("Données reçues :", createdGroup)

        if (createdGroup.group) {
          this.groups.push(createdGroup.group)
          return createdGroup
        }

        return null
      } catch (error) {
        console.error("Failed to create group:", error)
        return null
      }
    },

    removeGroup(groupId) {
      this.groups = this.groups.filter((group) => group._id !== groupId)
    },

    updateGroup(updatedGroup) {
      const index = this.groups.findIndex((group) => group._id === updatedGroup._id)
      if (index !== -1) {
        this.groups.splice(index, 1, updatedGroup)
      }
    },

    getGroupByUserId(userId) {
      return this.groups.find((group) => group.members.includes(userId)) // Suppose que chaque groupe a une liste `members`
    },

    async joinGroup(groupId) {
      try {
        const userStore = useUserStore()

        const response = await fetch(`http://localhost:3000/api/groups/${groupId}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userStore.userID }),
        })

        if (!response.ok) throw new Error("Erreur lors de l'adhésion au groupe")

        userStore.userGroupID = groupId
        console.log("Utilisateur ajouté au groupe avec succès !")
      } catch (error) {
        console.error("Erreur lors de l'adhésion au groupe :", error)
      }
    },

    async leaveGroup(groupId) {
      try {
        const userStore = useUserStore()

        // Récupérer les infos du groupe
        const group = this.groups.find((g) => g._id === groupId)
        if (!group) throw new Error("Groupe introuvable")

        // Vérifier si l'utilisateur est le dernier membre
        if (group.members.length === 1 && group.members[0] === userStore.userID) {
          console.log("Dernier membre du groupe, suppression du groupe...")

          // Supprimer le groupe
          const deleteResponse = await fetch(`http://localhost:3000/api/groups/${groupId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })

          if (!deleteResponse.ok) throw new Error("Erreur lors de la suppression du groupe")

          // Supprimer localement le groupe
          this.groups = this.groups.filter((g) => g._id !== groupId)
          userStore.userGroupID = "" // L'utilisateur n'a plus de groupe

          console.log("Groupe supprimé avec succès !")
          return
        }

        // Sinon, retirer seulement l'utilisateur du groupe
        console.log("Retrait de l'utilisateur du groupe...")

        const leaveResponse = await fetch(`http://localhost:3000/api/groups/${groupId}/leave`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userStore.userID }),
        })

        if (!leaveResponse.ok) throw new Error("Erreur lors du départ du groupe")

        // Mettre à jour le store utilisateur
        userStore.userGroupID = ""

        // Mettre à jour la liste des membres du groupe
        this.groups = this.groups.map((g) =>
          g._id === groupId ? { ...g, members: g.members.filter((id) => id !== userStore.userID) } : g
        )

        console.log("Utilisateur retiré du groupe avec succès !")
      } catch (error) {
        console.error("Erreur lors du départ du groupe :", error)
      }
    },
  },
  getters: {
    getGroupById: (state) => (id) => state.groups.find((group) => group._id === id),
    isMyGroup: (state) => (groupId) => {
      const userStore = useUserStore()
      return state.groups.some((group) => group._id === groupId && userStore.userGroupID === groupId)
    },
  },
})
