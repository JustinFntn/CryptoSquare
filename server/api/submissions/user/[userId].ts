import { defineEventHandler, createError } from "h3"
import { getSubmissionByUserIdFromDB } from "~/server/services/submissionService"

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params || {}

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: `userId is required in the URL`,
      stack: undefined,
    })
  }

  try {
    const submissions = await getSubmissionByUserIdFromDB(userId)
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
