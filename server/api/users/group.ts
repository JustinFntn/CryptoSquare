import { defineEventHandler, createError, readBody } from "h3"
import { updateGroupForUsersInDB, removeGroupFromUsersInDB } from "~/server/services/userService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === "PATCH") {
    try {
      const { groupId, userIds } = await readBody(event)

      if (!groupId) {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "groupId is required",
          stack: undefined,
        })
      }

      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "Invalid userIds array",
          stack: undefined,
        })
      }

      await updateGroupForUsersInDB(groupId, userIds)

      return {
        message: `Group '${groupId}' assigned to ${userIds.length} users`,
      }
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || "Internal Server Error",
        message: error.message,
        stack: undefined,
      })
    }
  }

  if (method === "DELETE") {
    try {
      const { userIds } = await readBody(event)

      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "Invalid userIds array",
          stack: undefined,
        })
      }

      await removeGroupFromUsersInDB(userIds)

      return { message: `Group removed from ${userIds.length} users` }
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || "Internal Server Error",
        message: error.message,
        stack: undefined,
      })
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" })
})
