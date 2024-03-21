import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import { IBodyRequest } from '@/contracts/request'
import { CreateQuestPayload } from '@/contracts/quest'
import { questService } from '../services/questService'

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
        data: { ...quest.toJSON() },
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
        data: { quests: [...quests.map(el => el.toJSON())] },
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
