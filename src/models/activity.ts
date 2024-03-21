import { Schema, model } from 'mongoose'

import {
  IActivity,
  IActivityMethods,
  ActivityModel
} from '../contracts/activity'

const schema = new Schema<IActivity, ActivityModel, IActivityMethods>(
  {
    title: String,
    description: String,
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
)

schema.methods.toJSON = function () {
  const obj = this.toObject()

  return obj
}

export const Activity = model<IActivity, ActivityModel>('Activity', schema)
