# Collections MongoDB

## 1. Users

Stocke les informations relatives à chaque joueur.  
Un joueur peut appartenir à un seul groupe via `groupId`.

**Structure**:

```json
{
  "_id": "ObjectId",
  "clerkUserId": "String",
  "username": "String",
  "email": "String",
  "groupId": "ObjectId"
}
```

db.users.createIndex({ groupId: 1 })

## 2. Groups

Stocke les informations sur les groupes/équipes.
Les membres se retrouvent via la collection users (champ groupId).

Structure:

```json
{
  "_id": "ObjectId",
  "name": "String"
}
```

## 3. Puzzles

```json
{
  "_id": "ObjectId",
  "title": "String",
  "subtitle": "String",
  "difficulty": "String",
  "basePoints": "Number",
  "hintPoints": ["Number", "Number", "Number"],
  "variants": [
    {
      "textEnigme": "String",
      "textReponse": "String"
    },
    {
      "textEnigme": "String",
      "textReponse": "String"
    },
    {
      "textEnigme": "String",
      "textReponse": "String"
    }
  ]
}
```

## 4. Submissions

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "puzzleId": "ObjectId",
  "status": "String",
  "hintsUsed": "Number",
  "attemptCount": "Number",
  "pointsEarned": "Number"
}
```
