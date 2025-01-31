import { defineStore } from "pinia"
import { useUserStore } from "@/stores/userStore"

export const useGroupsStore = defineStore("groups", {
  state: () => ({
    groups: [],
    groupData: null,
    members: [],
    scores: { easy: 0, medium: 0, hard: 0 },
    isLoaded: false,
  }),
  actions: {
    async fetchGroupData(groupId) {
      this.isLoaded = false

      try {
        const groupResponse = await fetch(`https://cryptosquare.csquare.dev/api/groups/${groupId}`)
        if (!groupResponse.ok) throw new Error("Erreur lors de la récupération du groupe")

        const groupData = await groupResponse.json()

        if (!groupData.group) {
          throw new Error("Malformed group data")
        }

        this.groupData = groupData.group

        const membersResponse = await fetch(`https://cryptosquare.csquare.dev/api/groups/members/${groupId}`)
        if (!membersResponse.ok) throw new Error("Erreur lors de la récupération des membres")

        const membersData = await membersResponse.json()
        this.members = membersData.members

        this.scores = await this.fetchGroupScores(groupId)
      } catch (error) {
        console.error("❌ Error loading group data:", error)
      } finally {
        this.isLoaded = true
      }
    },

    async fetchGroupMembers(groupId) {
      try {
        const response = await fetch(`https://cryptosquare.csquare.dev/api/groups/members/${groupId}`)
        if (!response.ok) throw new Error("Impossible de récupérer les membres")

        const data = await response.json()
        this.members = data.members
      } catch (error) {
        console.error("❌ Error loading members:", error)
      }
    },

    async fetchGroupScores(groupId) {
      try {
        const scores = { easy: 0, medium: 0, hard: 0 }

        const membersResponse = await fetch(`https://cryptosquare.csquare.dev/api/groups/members/${groupId}`)
        if (!membersResponse.ok) throw new Error("Erreur lors de la récupération des membres")

        const membersData = await membersResponse.json()

        if (!membersData || !Array.isArray(membersData.members)) {
          return scores
        }

        const members = membersData.members
        for (const member of members) {
          if (!member._id) {
            continue
          }

          const submissionsResponse = await fetch(`https://cryptosquare.csquare.dev/api/submissions/user/${member._id}`)
          if (!submissionsResponse.ok) continue

          const submissionsData = await submissionsResponse.json()
          if (!submissionsData || !Array.isArray(submissionsData.submissions)) {
            console.error("⚠️ Issue with submissions for", member.username, ":", submissionsData)
            continue
          }

          const completedSubmissions = submissionsData.submissions.filter((sub) => sub.status === "completed")
          for (const submission of completedSubmissions) {
            if (!submission.challengeId) {
              console.warn("⚠️ Soumission sans challengeId, ignorée :", submission)
              continue
            }

            const challengeResponse = await fetch(
              `https://cryptosquare.csquare.dev/api/challenges/${submission.challengeId}`
            )
            if (!challengeResponse.ok) continue

            const challengeData = await challengeResponse.json()
            if (!challengeData || !challengeData.difficulty) {
              console.warn("⚠️ Invalid or difficulty-less challenge:", challengeData)
              continue
            }

            scores[challengeData.difficulty]++
          }
        }

        this.scores = scores
        return scores
      } catch (error) {
        console.error("❌ Error loading scores:", error)
        return { easy: 0, medium: 0, hard: 0 }
      }
    },

    async fetchGroupTotalPoints(groupId) {
      try {
        let totalPoints = 0

        const membersResponse = await fetch(`https://cryptosquare.csquare.dev/api/groups/members/${groupId}`)
        if (!membersResponse.ok) throw new Error("Error fetching members")

        const membersData = await membersResponse.json()
        if (!membersData || !Array.isArray(membersData.members)) return 0

        for (const member of membersData.members) {
          if (!member._id) continue

          const submissionsResponse = await fetch(`https://cryptosquare.csquare.dev/api/submissions/user/${member._id}`)
          if (!submissionsResponse.ok) continue

          const submissionsData = await submissionsResponse.json()
          if (!submissionsData || !Array.isArray(submissionsData.submissions)) continue

          totalPoints += submissionsData.submissions
            .filter((sub) => sub.status === "completed")
            .reduce((acc, sub) => acc + (sub.pointsEarned || 0), 0)
        }
        return totalPoints
      } catch (error) {
        console.error("❌ Error calculating group points:", error)
        return 0
      }
    },

    async fetchAllGroups() {
      try {
        const response = await fetch("https://cryptosquare.csquare.dev/api/groups")
        const data = await response.json()
        this.groups = data.groups
      } catch (error) {
        console.error("Error fetching groups:", error)
      }
    },

    async createGroup(group) {
      try {
        const response = await fetch("https://cryptosquare.csquare.dev/api/groups", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(group),
        })

        if (!response.ok) throw new Error("Error creating group")

        const createdGroup = await response.json()

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
      return this.groups.find((group) => group.members.includes(userId))
    },

    async joinGroup(groupId) {
      try {
        const userStore = useUserStore()

        console.log(`Tentative d'adhésion au groupe ${groupId} pour l'utilisateur ${userStore.userID}...`)

        const response = await fetch(`https://cryptosquare.csquare.dev/api/users/group`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupId: groupId,
            userIds: [userStore.userID],
          }),
        })

        if (!response.ok) {
          throw new Error(`Error joining group: ${response.status}`)
        }

        const updatedData = await response.json()

        userStore.userGroupID = groupId

        console.log("User successfully added to the group!", updatedData)
      } catch (error) {
        console.error("Error joining group:", error)
      }
    },

    async leaveGroup(groupId) {
      try {
        const userStore = useUserStore()

        const group = this.groups.find((g) => g._id === groupId)
        if (!group) throw new Error("Group not found")

        console.log("Retrait de l'utilisateur du groupe...")
        const leaveResponse = await fetch(`https://cryptosquare.csquare.dev/api/users/group`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userIds: [userStore.userID] }),
        })

        if (!leaveResponse.ok) throw new Error("Error leaving the group")

        userStore.userGroupID = ""

        console.log("Vérification des membres restants dans le groupe...")
        const usersResponse = await fetch("https://cryptosquare.csquare.dev/api/users")
        if (!usersResponse.ok) throw new Error("Impossible de récupérer les utilisateurs")

        const allUsers = await usersResponse.json()

        const remainingMembers = allUsers.filter((user) => user.groupId === groupId)

        if (remainingMembers.length === 0) {
          console.log("No members remaining in the group, deleting...")

          const deleteResponse = await fetch(`https://cryptosquare.csquare.dev/api/groups/${groupId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })

          if (!deleteResponse.ok) throw new Error("Error deleting the group")
          this.groups = this.groups.filter((g) => g._id !== groupId)
        } else {
          this.groups = this.groups.map((g) =>
            g._id === groupId ? { ...g, members: g.members.filter((id) => id !== userStore.userID) } : g
          )
        }
      } catch (error) {
        console.error("Error leaving the group:", error)
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
