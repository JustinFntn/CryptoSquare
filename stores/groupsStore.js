import { defineStore } from "pinia"

export const useGroupsStore = defineStore("groups", {
  state: () => ({
    groups: [
      { id: 1, name: "Group 1", groupColor: "#3498DB", description: "Description 1", memberNumber: 1098 },
      { id: 2, name: "Group 2", groupColor: "#3498DB", description: "Description 2", memberNumber: 2098 },
      { id: 3, name: "Group 3", groupColor: "#3498DB", description: "Description 3", memberNumber: 3098 },
    ],
  }),
  actions: {
    addGroup(group) {
      // TODO : Implémenter dans l'API
      this.groups.push(group)
    },
    // TODO : Implémenter dans l'API
    removeGroup(groupId) {
      this.groups = this.groups.filter((group) => group.id !== groupId)
    },
    // TODO : Implémenter dans l'API
    updateGroup(updatedGroup) {
      const index = this.groups.findIndex((group) => group.id === updatedGroup.id)
      if (index !== -1) {
        this.groups.splice(index, 1, updatedGroup)
      }
    },
  },
  getters: {
    getGroupById: (state) => (id) => {
      return state.groups.find((group) => group.id === id)
    },
  },
})
