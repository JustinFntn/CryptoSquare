import { defineEventHandler, createError } from "h3"
import {
  getSubmissionByIdFromDB,
  updateSubmissionInDB,
  deleteSubmissionFromDB,
} from "~/server/services/submissionService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const { id } = event.context.params || {}

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Submission ID is required in URL",
      stack: undefined,
    })
  }

  if (method === "GET") {
    return await getSubmissionByIdFromDB(id)
  }

  if (method === "PUT") {
    try {
      const body = await readBody(event)
      return await updateSubmissionInDB(id, body)
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message,
        stack: undefined,
      })
    }
  }

  if (method === "DELETE") {
    try {
      await deleteSubmissionFromDB(id)
      return { message: "Submission deleted successfully" }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message,
        stack: undefined,
      })
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" })
})
