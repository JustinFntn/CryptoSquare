import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGO_URI || ""
let client: MongoClient
let db: Db

export async function useMongo(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db()
  }
  return db
}
