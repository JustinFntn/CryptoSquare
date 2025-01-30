import { ObjectId } from "mongodb"

export interface Challenge {
  _id?: ObjectId
  title: string
  subtitle: string
  difficulty: string
  content: string
  basePoints: number
  clues: { difficulty: string; textEnigme: string; value: number }[]
  answer: string
}
