import { defineEventHandler, createError, readBody } from "h3"
import { getUserByIdFromDB, updateUserInDB, deleteUserFromDB } from "~/server/services/userService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const id = event.context.params?.id

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "_id is required in URL",
      stack: undefined,
    })
  }

  if (method === "GET") {
    return await getUserByIdFromDB(id)
  }

  if (method === "PUT") {
    try {
      const body = await readBody(event)
      return await updateUserInDB(id, body)
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
      await deleteUserFromDB(id)
      return { message: "User deleted successfully" }
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
