import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import {
  IBodyRequest,
  ICombinedRequest,
  IParamsRequest,
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
    try {
      const activities = await activityService.getAll()
      return res.status(StatusCodes.OK).json({
        data: [...activities.map(el => el.toObject())],
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
  join: async (
    {
      context: { user },
      params: { activityId }
    }: ICombinedRequest<
      IUserRequest,
      Record<string, unknown>,
      IParamsRequest<{ activityId: string }>
    >,
    res: Response
  ) => {
    try {
      const activity = await activityService.getById(activityId)
      if (!activity) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      if (
        [...activity.participants].map(el => el.toString()).includes(user.id)
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      await activityService.addParticipant(activityId, user.id)

      return res.status(StatusCodes.OK).json({
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
  getById: async (
    {
      params: { activityId }
    }: ICombinedRequest<
      IUserRequest,
      Record<string, unknown>,
      IParamsRequest<{ activityId: string }>
    >,
    res: Response
  ) => {
    try {
      const activity = await activityService.getById(activityId)
      if (!activity) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      return res.status(StatusCodes.OK).json({
        data: { ...activity },
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
  }
}
