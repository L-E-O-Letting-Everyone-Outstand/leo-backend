import { ClientSession } from 'mongoose'

import { Quest } from '../models/quest'

export const questService = {
  create: (
    {
      title,
      description,
      pointsAmount
    }: {
      title: string
      description: string
      pointsAmount: string
    },
    session?: ClientSession
  ) =>
    new Quest({
      title,
      description,
      pointsAmount
    }).save({ session }),

  getAll: () => Quest.find(),
  getById: (id: string) => Quest.findById(id)
}
