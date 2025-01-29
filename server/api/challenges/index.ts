import { defineEventHandler, createError, readBody } from "h3"
import { getUserByIdFromDB, createUserInDB } from "~/server/services/userService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === "GET") {
    const { _id } = getQuery(event)
    if (!_id) {
      throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "_id is required" })
    }
    return await getUserByIdFromDB(_id as string)
  }

  if (method === "POST") {
    try {
      const body = await readBody(event)
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
