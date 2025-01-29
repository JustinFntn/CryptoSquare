import { ObjectId } from "mongodb"
import { useMongo } from "~/server/utils/mongoClient"
import { createError } from "h3"

export interface User {
  _id?: ObjectId
  clerkUserId: string
  username: string
  email?: string | null
  groupId?: ObjectId | null
}

export async function createUserInDB(data: Partial<User>): Promise<User> {
  if (!data.username) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "'username' is required",
      stack: undefined,
    })
  }
  if (!data.clerkUserId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "'clerkUserId' is required",
      stack: undefined,
    })
  }

  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  const existingUser = await usersCollection.findOne({ clerkUserId: data.clerkUserId })
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Conflict",
      message: `User with clerkUserId '${data.clerkUserId}' already exists`,
      stack: undefined,
    })
  }

  const newUser: User = {
    _id: new ObjectId(),
    clerkUserId: data.clerkUserId!,
    username: data.username!,
    email: data.email ?? null,
    groupId: data.groupId ?? null,
  }

  const result = await usersCollection.insertOne(newUser)

  return {
    _id: result.insertedId,
    ...newUser,
  }
}

export async function getAllUsersFromDB(): Promise<User[]> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  return usersCollection.find().toArray()
}

export async function getUserByIdFromDB(id: string): Promise<User | null> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  return usersCollection.findOne({ _id: new ObjectId(id) })
}

export async function updateUserInDB(id: string, data: Partial<User>): Promise<User> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  const existingUser = await usersCollection.findOne({ _id: new ObjectId(id) })
  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `User with id '${id}' not found`,
      stack: undefined,
    })
  }

  const updatedUser: User = {
    ...existingUser,
    ...data,
  }

  await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedUser })

  return updatedUser
}

export async function deleteUserFromDB(id: string): Promise<void> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  const existingUser = await usersCollection.findOne({ _id: new ObjectId(id) })
  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `User with id '${id}' not found`,
      stack: undefined,
    })
  }

  await usersCollection.deleteOne({ _id: new ObjectId(id) })
}

export async function getUserByClerkUserIdFromDB(clerkUserId: string): Promise<User | null> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  return usersCollection.findOne({ clerkUserId })
}

export async function updateGroupForUsersInDB(groupId: string, userIds: string[]): Promise<void> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  if (!ObjectId.isValid(groupId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid groupId format (must be a 24-character hex string)",
      stack: undefined,
    })
  }

  const objectUserIds = userIds.map((id) => {
    if (!ObjectId.isValid(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: `Invalid userId format: ${id} (must be a 24-character hex string)`,
        stack: undefined,
      })
    }
    return new ObjectId(id)
  })

  const existingUsers = await usersCollection.find({ _id: { $in: objectUserIds } }).toArray()
  if (existingUsers.length !== userIds.length) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Some userIds do not exist in the database",
      stack: undefined,
    })
  }

  await usersCollection.updateMany({ _id: { $in: objectUserIds } }, { $set: { groupId: new ObjectId(groupId) } })
}

export async function removeGroupForUsersInDB(groupId: string): Promise<void> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  if (!ObjectId.isValid(groupId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid groupId format (must be a 24-character hex string)",
      stack: undefined,
    })
  }

  const usersInGroup = await usersCollection.find({ groupId: new ObjectId(groupId) }).toArray()
  if (usersInGroup.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `No users found in group ${groupId}`,
      stack: undefined,
    })
  }

  await usersCollection.updateMany({ groupId: new ObjectId(groupId) }, { $set: { groupId: null } })
}
