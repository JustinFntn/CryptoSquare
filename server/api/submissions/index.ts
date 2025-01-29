import { defineEventHandler, createError, readBody } from "h3"
import { getAllSubmissionsFromDB, createSubmissionInDB } from "~/server/services/submissionService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === "GET") {
    try {
      const submissions = await getAllSubmissionsFromDB()
      return { message: "Submissions retrieved successfully", submissions }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to retrieve submissions",
        stack: undefined,
      })
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event)
      const newSubmission = await createSubmissionInDB(body)
      return { message: "Submission created successfully", submission: newSubmission }
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
