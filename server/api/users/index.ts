import { defineEventHandler, createError, readBody } from "h3"
import { getAllUsersFromDB, createUserInDB } from "~/server/services/userService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === "GET") {
    try {
      const users = await getAllUsersFromDB()
      return { message: "Users retrieved successfully", users }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to retrieve users",
        stack: undefined,
      })
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event)
      const newUser = await createUserInDB(body)
      return { message: "User created successfully", user: newUser }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to create user",
        stack: undefined,
      })
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed", stack: undefined })
})
