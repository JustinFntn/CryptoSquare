import { defineEventHandler, createError } from "h3"
import { ObjectId } from "mongodb"
import { getAllMembersOfGroupFromDB } from "~/server/services/groupService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const { id } = event.context.params || {}

  // Vérification de la méthode HTTP
  if (method !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
      message: "Only GET method is allowed for this endpoint",
      stack: undefined,
    })
  }

  // Validation de l'ID du groupe
  if (!id || !ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid or missing group ID (must be a 24-character hex string)",
      stack: undefined,
    })
  }

  try {
    const members = await getAllMembersOfGroupFromDB(id)

    return {
      message: "Members retrieved successfully",
      members,
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message || "Failed to retrieve members",
      stack: undefined,
    })
  }
})
