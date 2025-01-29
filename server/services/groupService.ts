import { ObjectId } from "mongodb"
import { useMongo } from "~/server/utils/mongoClient"
import { createError } from "h3"

export interface Group {
  _id?: ObjectId
  name: string
  description: string
  image: string
}

export async function getAllGroupsFromDB(): Promise<Group[]> {
  const db = await useMongo()
  return db.collection<Group>("groups").find().toArray()
}

export async function createGroupInDB(data: Partial<Group>): Promise<Group> {
  if (!data.name) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Group name is required",
      stack: undefined,
    })
  }

  const db = await useMongo()
  const newGroup: Group = {
    _id: new ObjectId(),
    name: data.name,
    description: data.description || "",
    image: data.image || "",
  }

  await db.collection<Group>("groups").insertOne(newGroup)
  return newGroup
}

export async function getGroupByIdFromDB(id: string): Promise<Group | null> {
  const db = await useMongo()
  return db.collection<Group>("groups").findOne({ _id: new ObjectId(id) })
}

export async function updateGroupInDB(id: string, data: Partial<Group>): Promise<Group> {
  const db = await useMongo()
  const collection = db.collection<Group>("groups")

  const existingGroup = await collection.findOne({ _id: new ObjectId(id) })
  if (!existingGroup) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Group with id '${id}' not found`,
      stack: undefined,
    })
  }

  const updatedGroup = { ...existingGroup, ...data }
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedGroup })

  return updatedGroup
}

export async function deleteGroupFromDB(id: string): Promise<void> {
  const db = await useMongo()
  const collection = db.collection<Group>("groups")

  const existingGroup = await collection.findOne({ _id: new ObjectId(id) })
  if (!existingGroup) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Group with id '${id}' not found`,
      stack: undefined,
    })
  }

  await collection.deleteOne({ _id: new ObjectId(id) })
}
