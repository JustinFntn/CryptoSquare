import { useMongo } from "~/server/utils/mongoClient"
import { createError } from "h3"

export interface User {
  _id?: string
  username: string
  email?: string | null
  groupId?: string | null
}

export async function createUserInDB(data: Partial<User>): Promise<User> {
  if (!data._id || !data.username) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "'id' and 'username' are required",
      stack: undefined,
    })
  }

  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  const existingUser = await usersCollection.findOne({ _id: data._id })
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Conflict",
      message: `User with _id '${data._id}' already exists`,
      stack: undefined,
    })
  }

  const newUser: User = {
    _id: data._id,
    username: data.username,
    email: data.email ?? null,
    groupId: data.groupId ?? null,
  }

  await usersCollection.insertOne(newUser)
  return newUser
}

export async function getAllUsersFromDB(): Promise<User[]> {
  const db = await useMongo()
  return db.collection<User>("users").find().toArray()
}

export async function getUserByIdFromDB(userId: string): Promise<User | null> {
  const db = await useMongo()
  return db.collection<User>("users").findOne({ _id: userId })
}

export async function updateUserInDB(userId: string, data: Partial<User>): Promise<User> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  const existingUser = await usersCollection.findOne({ _id: userId })
  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `User with _id '${userId}' not found`,
      stack: undefined,
    })
  }

  await usersCollection.updateOne({ _id: userId }, { $set: data })
  return { ...existingUser, ...data }
}

export async function deleteUserFromDB(userId: string): Promise<void> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  const existingUser = await usersCollection.findOne({ _id: userId })
  if (!existingUser) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `User with _id '${userId}' not found`,
      stack: undefined,
    })
  }

  await usersCollection.deleteOne({ _id: userId })
}

export async function updateGroupForUsersInDB(groupId: string, userIds: string[]): Promise<void> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  const existingUsers = await usersCollection.find({ _id: { $in: userIds } }).toArray()

  if (existingUsers.length !== userIds.length) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Some userIds do not exist in the database",
      stack: undefined,
    })
  }

  await usersCollection.updateMany({ _id: { $in: userIds } }, { $set: { groupId } })
}

export async function removeGroupFromUsersInDB(userIds: string[]): Promise<void> {
  const db = await useMongo()
  const usersCollection = db.collection<User>("users")

  await usersCollection.updateMany({ _id: { $in: userIds } }, { $set: { groupId: null } })
}
