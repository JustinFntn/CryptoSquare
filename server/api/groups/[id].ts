import { defineEventHandler, createError, readBody } from "h3"
import { ObjectId } from "mongodb"
import { getGroupByIdFromDB, updateGroupInDB, deleteGroupFromDB } from "~/server/services/groupService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const { id } = event.context.params || {}

  if (!id || !ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid or missing group ID (must be a 24-character hex string)",
      stack: undefined,
    })
  }

  if (method === "GET") {
    try {
      const group = await getGroupByIdFromDB(id)
      if (!group) {
        throw createError({
          statusCode: 404,
          statusMessage: "Not Found",
          message: `Group with id '${id}' not found`,
          stack: undefined,
        })
      }
      return { message: "Group retrieved successfully", group }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message,
        stack: undefined,
      })
    }
  }

  if (method === "PUT") {
    try {
      const body = await readBody(event)
      const updatedGroup = await updateGroupInDB(id, body)
      return { message: "Group updated successfully", group: updatedGroup }
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
      await deleteGroupFromDB(id)
      return { message: "Group deleted successfully" }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to delete group",
        stack: undefined,
      })
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed", stack: undefined })
})
