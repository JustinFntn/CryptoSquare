import { defineEventHandler, createError } from "h3"
import { getUserByClerkUserIdFromDB } from "~/server/services/userService"

export default defineEventHandler(async (event) => {
  const params = event.context.params
  if (!params || !params.clerkUserId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "ClerkUserId is required",
      stack: undefined,
    })
  }

  const { clerkUserId } = params

  try {
    const user = await getUserByClerkUserIdFromDB(clerkUserId)
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: `User with clerkUserId '${clerkUserId}' not found`,
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
})
