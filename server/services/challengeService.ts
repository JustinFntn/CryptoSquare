import { ObjectId } from "mongodb"
import { useMongo } from "~/server/utils/mongoClient"
import { createError } from "h3"
import { Challenge } from "../../types/Challenge"

export async function getAllChallengesFromDB(): Promise<Challenge[]> {
  const db = await useMongo()
  return db.collection<Challenge>("challenges").find().toArray()
}

export async function createChallengeInDB(data: Partial<Challenge>): Promise<Challenge> {
  if (
    !data.title ||
    !data.subtitle ||
    !data.difficulty ||
    !data.content ||
    !data.basePoints ||
    !data.clues ||
    !data.answer
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "All fields are required, including 'answer'",
      stack: undefined,
    })
  }

  const db = await useMongo()
  const challengesCollection = db.collection<Challenge>("challenges")

  const newChallenge: Challenge = {
    _id: data._id,
    title: data.title,
    subtitle: data.subtitle,
    difficulty: data.difficulty,
    content: data.content,
    basePoints: data.basePoints,
    clues: data.clues,
    answer: data.answer,
  }

  await challengesCollection.insertOne(newChallenge)
  return newChallenge
}

export async function getChallengeByIdFromDB(id: string): Promise<Challenge | null> {
  const db = await useMongo()
  return db.collection<Challenge>("challenges").findOne({ _id: new ObjectId(id) })
}

export async function updateChallengeInDB(id: string, data: Partial<Challenge>): Promise<Challenge> {
  const db = await useMongo()
  const collection = db.collection<Challenge>("challenges")

  const existingChallenge = await collection.findOne({ _id: new ObjectId(id) })
  if (!existingChallenge) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Challenge with id '${id}' not found`,
      stack: undefined,
    })
  }

  const updatedChallenge = { ...existingChallenge, ...data }
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedChallenge })

  return updatedChallenge
}

export async function deleteChallengeFromDB(id: string): Promise<void> {
  const db = await useMongo()
  const collection = db.collection<Challenge>("challenges")

  const existingChallenge = await collection.findOne({ _id: new ObjectId(id) })
  if (!existingChallenge) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Challenge with id '${id}' not found`,
      stack: undefined,
    })
  }

  await collection.deleteOne({ _id: new ObjectId(id) })
}
