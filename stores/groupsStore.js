import { defineStore } from "pinia"

export const useGroupsStore = defineStore("groups", {
  state: () => ({
    groups: [
      { id: 1, name: "Group 1", imageId: 1, description: "Description 1", memberIds: [1, 2, 3] },
      { id: 2, name: "Group 2", imageId: 2, description: "Description 2", memberIds: [4, 5, 6] },
    ],
  }),
  actions: {
    addGroup(group) {
      this.groups.push(group)
    },
    removeGroup(groupId) {
      this.groups = this.groups.filter((group) => group.id !== groupId)
    },
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
