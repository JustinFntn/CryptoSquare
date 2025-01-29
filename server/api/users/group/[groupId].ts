import { defineEventHandler, createError, readBody } from "h3"
import { ObjectId } from "mongodb"
import { updateGroupForUsersInDB, removeGroupForUsersInDB } from "~/server/services/userService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const params = event.context.params
  if (!params) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Missing parameters",
      stack: undefined,
    })
  }
  const { groupId } = params

  if (!groupId || !ObjectId.isValid(groupId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid or missing groupId (must be a 24-character hex string)",
      stack: undefined,
    })
  }

  if (method === "PATCH") {
    try {
      const { userIds } = await readBody(event)

      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "Invalid userIds array (must be a non-empty array of ObjectId strings)",
          stack: undefined,
        })
      }

      for (const id of userIds) {
        if (!ObjectId.isValid(id)) {
          throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: `Invalid userId format: ${id} (must be a 24-character hex string)`,
            stack: undefined,
          })
        }
      }

      await updateGroupForUsersInDB(groupId, userIds)
      return { message: `Group updated for ${userIds.length} users` }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to update group",
        stack: undefined,
      })
    }
  }

  if (method === "DELETE") {
    try {
      await removeGroupForUsersInDB(groupId)
      return { message: "Group removed from all users" }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to remove group from users",
        stack: undefined,
      })
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed", stack: undefined })
})
