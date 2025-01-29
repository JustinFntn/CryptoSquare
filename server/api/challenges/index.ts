import { defineEventHandler, createError, readBody } from "h3"
import { getAllChallengesFromDB, createChallengeInDB } from "~/server/services/challengeService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === "GET") {
    try {
      const challenges = await getAllChallengesFromDB()
      return { message: "Challenges retrieved successfully", challenges }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to retrieve challenges",
        stack: undefined,
      })
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event)

      if (
        !body.title ||
        !body.subtitle ||
        !body.difficulty ||
        !body.content ||
        !body.basePoints ||
        !body.clues ||
        !body.answer
      ) {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "All fields are required, including 'answer'",
          stack: undefined,
        })
      }

      const newChallenge = await createChallengeInDB(body)
      return { message: "Challenge created successfully", challenge: newChallenge }
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
