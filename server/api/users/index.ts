import { defineEventHandler, createError, readBody } from "h3"
import { createUserInDB, getAllUsersFromDB } from "~/server/services/userService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === "GET") {
    return await getAllUsersFromDB()
  }

  if (method === "POST") {
    try {
      const body = await readBody(event)

      if (!body._id) {
        throw createError({
          statusCode: 400,
          statusMessage: "Bad Request",
          message: "_id is required in the request body",
          stack: undefined,
        })
      }

      return await createUserInDB(body)
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
