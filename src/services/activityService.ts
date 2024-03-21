import { ClientSession } from 'mongoose'

import { Activity } from '../models/activity'

export const activityService = {
  create: (
    {
      title,
      description,
      creatorId
    }: {
      title: string
      description: string
      creatorId: string
    },
    session?: ClientSession
  ) =>
    new Activity({
      title,
      description,
      creatorId,
      participants: [creatorId]
    }).save({ session }),

  getAll: () => Activity.find()
}
