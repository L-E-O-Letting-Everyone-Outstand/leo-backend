import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import {
  IBodyRequest,
  ICombinedRequest,
  IParamsRequest,
  IUserRequest
} from '@/contracts/request'
import { CreateQuestPayload } from '@/contracts/quest'
import { questService } from '../services/questService'
import { userService } from '../services'

export const questController = {
  create: async (
    {
      body: { title, description, pointsAmount }
    }: IBodyRequest<CreateQuestPayload>,
    res: Response
  ) => {
    try {
      const quest = await questService.create({
        title,
        description,
        pointsAmount
      })

      return res.status(StatusCodes.OK).json({
        data: { ...quest.toObject() },
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
      const quests = await questService.getAll()

      return res.status(StatusCodes.OK).json({
        data: { quests: [...quests.map(el => el.toObject())] },
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
  take: async (
    {
      context: { user },
      params: { questId }
    }: ICombinedRequest<
      IUserRequest,
      Record<string, unknown>,
      IParamsRequest<{ questId: string }>
    >,
    res: Response
  ) => {
    try {
      const quest = await questService.getById(questId)
      if (!quest) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      if (
        [...user.takenQuests, ...user.completedQuests]
          .map(el => el.toString())
          .includes(questId)
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      await userService.takeQuest(user.id, questId)

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
  complete: async (
    {
      context: { user },
      params: { questId }
    }: ICombinedRequest<
      IUserRequest,
      Record<string, unknown>,
      IParamsRequest<{ questId: string }>
    >,
    res: Response
  ) => {
    try {
      const quest = await questService.getById(questId)
      if (!quest) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      if (
        [...user.completedQuests].map(el => el.toString()).includes(questId)
      ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      await userService.completeQuest(user.id, questId)

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
      params: { questId }
    }: ICombinedRequest<
      IUserRequest,
      Record<string, unknown>,
      IParamsRequest<{ questId: string }>
    >,
    res: Response
  ) => {
    try {
      const quest = await questService.getById(questId)
      if (!quest) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      const { completed, taken } = userService.getQuestParticipants(questId)

      return res.status(StatusCodes.OK).json({
        data: {
          ...quest.toObject(),
          users: {
            completed: await completed,
            taken: await taken
          }
        },
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
