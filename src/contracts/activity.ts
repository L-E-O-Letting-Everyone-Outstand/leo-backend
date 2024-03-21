import { Model, ObjectId } from 'mongoose'

export interface IActivity {
  id: ObjectId
  title: string
  description: string
  creatorId: ObjectId
  participants: ObjectId[]
}

export interface CreateActivityPayload {
  title: string
  description: string
}

export interface IActivityMethods {
  comparePassword: (password: string) => boolean
}

export type ActivityModel = Model<IActivity, unknown, IActivityMethods>
