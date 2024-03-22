import { Model, ObjectId } from 'mongoose'

export interface IQuest {
  id: ObjectId
  title: string
  description: string
  pointsAmount: number
}

export interface CreateQuestPayload {
  title: string
  description: string
  pointsAmount: string
}

export interface IQuestMethods {
  comparePassword: (password: string) => boolean
}

export type QuestModel = Model<IQuest, unknown, IQuestMethods>
