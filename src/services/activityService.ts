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

  getAll: () => Activity.find(),
  getById: (activityId: string) => Activity.findById(activityId),
  addParticipant: (activityId: string, userId: string) =>
    Activity.findByIdAndUpdate(activityId, { $push: { participants: userId } }),
  getByUserId: (userId: string) => Activity.find({ participants: userId })
}
