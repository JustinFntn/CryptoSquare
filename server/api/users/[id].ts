import { defineEventHandler, createError, readBody } from "h3"
import { getUserByIdFromDB, updateUserInDB, deleteUserFromDB } from "~/server/services/userService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const { id } = event.context.params || {}

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "User ID is required",
      stack: undefined,
    })
  }

  if (method === "GET") {
    try {
      const user = await getUserByIdFromDB(id)
      if (!user) {
        throw createError({
          statusCode: 404,
          statusMessage: "Not Found",
          message: `User with id '${id}' not found`,
          stack: undefined,
        })
      }
      return { message: "User retrieved successfully", user }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message,
        stack: undefined,
      })
    }
  }

  if (method === "PUT") {
    try {
      const body = await readBody(event)
      const updatedUser = await updateUserInDB(id, body)
      return { message: "User updated successfully", user: updatedUser }
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

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed", stack: undefined })
})
