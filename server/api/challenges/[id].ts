import { defineEventHandler, createError, readBody } from "h3"
import { ObjectId } from "mongodb"
import { getChallengeByIdFromDB, updateChallengeInDB, deleteChallengeFromDB } from "~/server/services/challengeService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const { id } = event.context.params || {}

  if (!id || !ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid or missing challenge ID",
      stack: undefined,
    })
  }

  if (method === "GET") {
    return await getChallengeByIdFromDB(id)
  }

  if (method === "PUT") {
    try {
      const body = await readBody(event)
      return await updateChallengeInDB(id, body)
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to update challenge",
        stack: undefined,
      })
    }
  }

  if (method === "DELETE") {
    try {
      await deleteChallengeFromDB(id)
      return { message: "Challenge deleted successfully" }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to delete challenge",
        stack: undefined,
      })
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" })
})
