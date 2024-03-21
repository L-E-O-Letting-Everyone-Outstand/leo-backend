import { Schema, model } from 'mongoose'

import { IQuest, IQuestMethods, QuestModel } from '../contracts/quest'

const schema = new Schema<IQuest, QuestModel, IQuestMethods>(
  {
    title: String,
    description: String,
    pointsAmount: Number
  },
  { timestamps: true }
)

schema.methods.toJSON = function () {
  const obj = this.toObject()

  return obj
}

export const Quest = model<IQuest, QuestModel>('Quest', schema)
