import { defineEventHandler, createError } from "h3"
import { getSubmissionByUserIdFromDBAndChallengeId } from "~/server/services/submissionService"

export default defineEventHandler(async (event) => {
  const { userId, challengeId } = event.context.params || {}

  if (!userId || !challengeId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "userId and challengeId are required in the URL",
      stack: undefined,
    })
  }

  try {
    const submissions = await getSubmissionByUserIdFromDBAndChallengeId(userId, challengeId)
    return { message: "Submissions retrieved successfully", submissions }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message || "Failed to retrieve submissions",
      stack: undefined,
    })
  }
})
