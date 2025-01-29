import { useMongo } from "~/server/utils/mongoClient"
import { ObjectId } from "mongodb"
import { createError } from "h3"

export interface Submission {
  _id?: ObjectId
  userId: string
  challengeId: string
  status: string
  hintsUsed: { hintType: string }[]
  attemptCount: number
  pointsEarned: number
}

export async function getAllSubmissionsFromDB(): Promise<Submission[]> {
  const db = await useMongo()
  return db.collection<Submission>("submissions").find().toArray()
}

export async function createSubmissionInDB(data: Partial<Submission>): Promise<Submission> {
  if (!data.userId || !data.challengeId || !data.status) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "'userId', 'challengeId' and 'status' are required",
      stack: undefined,
    })
  }

  const db = await useMongo()
  const submissionsCollection = db.collection<Submission>("submissions")

  const newSubmission: Submission = {
    _id: new ObjectId(),
    userId: data.userId,
    challengeId: data.challengeId,
    status: data.status,
    hintsUsed: data.hintsUsed ?? [],
    attemptCount: data.attemptCount ?? 0,
    pointsEarned: data.pointsEarned ?? 0,
  }

  await submissionsCollection.insertOne(newSubmission)
  return newSubmission
}

export async function getSubmissionByIdFromDB(id: string): Promise<Submission | null> {
  const db = await useMongo()

  if (!ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: `Invalid submission ID format: '${id}'`,
      stack: undefined,
    })
  }
  return db.collection<Submission>("submissions").findOne({ _id: new ObjectId(id) })
}

export async function getSubmissionByUserIdFromDB(userId: string): Promise<Submission[]> {
  const db = await useMongo()
  return db.collection<Submission>("submissions").find({ userId }).toArray()
}

export async function getSubmissionByUserIdFromDBAndChallengeId(
  userId: string,
  challengeId: string
): Promise<Submission[]> {
  const db = await useMongo()
  return db.collection<Submission>("submissions").find({ userId, challengeId }).toArray()
}

export async function updateSubmissionInDB(id: string, data: Partial<Submission>): Promise<Submission> {
  const db = await useMongo()
  const submissionsCollection = db.collection<Submission>("submissions")

  if (!ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: `Invalid submission ID format: '${id}'`,
      stack: undefined,
    })
  }

  const existingSubmission = await submissionsCollection.findOne({ _id: new ObjectId(id) })
  if (!existingSubmission) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Submission with _id '${id}' not found`,
      stack: undefined,
    })
  }

  await submissionsCollection.updateOne({ _id: new ObjectId(id) }, { $set: data })
  return { ...existingSubmission, ...data }
}

export async function deleteSubmissionFromDB(id: string): Promise<void> {
  const db = await useMongo()
  const submissionsCollection = db.collection<Submission>("submissions")

  if (!ObjectId.isValid(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: `Invalid submission ID format: '${id}'`,
      stack: undefined,
    })
  }

  const existingSubmission = await submissionsCollection.findOne({ _id: new ObjectId(id) })
  if (!existingSubmission) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found",
      message: `Submission with _id '${id}' not found`,
      stack: undefined,
    })
  }

  await submissionsCollection.deleteOne({ _id: new ObjectId(id) })
}
