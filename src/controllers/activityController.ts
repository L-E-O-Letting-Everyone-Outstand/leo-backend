import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import {
  IBodyRequest,
  ICombinedRequest,
  IUserRequest
} from '@/contracts/request'
import { activityService } from '../services/activityService'
import { CreateActivityPayload } from '../contracts/activity'

export const activityController = {
  create: async (
    {
      context: {
        user: { id: creatorId }
      },
      body: { title, description }
    }: ICombinedRequest<IUserRequest, CreateActivityPayload>,
    res: Response
  ) => {
    try {
      const activity = await activityService.create({
        title,
        description,
        creatorId
      })

      return res.status(StatusCodes.OK).json({
        data: { ...activity.toJSON() },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK
      })
    } catch (error) {
      winston.error(error)

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  },
  // TO DO: fix this shit
  getAll: async (a: IBodyRequest<string>, res: Response) => {
    // try {
    //   const quests = await questService.getAll()
    //   return res.status(StatusCodes.OK).json({
    //     data: { quests: [...quests.map(el => el.toJSON())] },
    //     message: ReasonPhrases.OK,
    //     status: StatusCodes.OK
    //   })
    // } catch (error) {
    //   winston.error(error)
    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     message: ReasonPhrases.BAD_REQUEST,
    //     status: StatusCodes.BAD_REQUEST
    //   })
    // }
  }
}
