import { defineEventHandler, createError, readBody } from "h3"
import { getAllGroupsFromDB, createGroupInDB } from "~/server/services/groupService"

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === "GET") {
    try {
      const groups = await getAllGroupsFromDB()
      return { message: "Groups retrieved successfully", groups }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to retrieve groups",
        stack: undefined,
      })
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event)
      const newGroup = await createGroupInDB(body)
      return { message: "Group created successfully", group: newGroup }
    } catch (error: any) {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: error.message || "Failed to create group",
        stack: undefined,
      })
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed", stack: undefined })
})
