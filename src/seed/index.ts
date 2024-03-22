import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import { IBodyRequest } from '@/contracts/request'
import { CreateQuestPayload } from '@/contracts/quest'

export const devController = {
  seed: async (
    {
      body: { title, description, pointsAmount }
    }: IBodyRequest<CreateQuestPayload>,
    res: Response
  ) => {
    try {
    } catch (error) {
      winston.error(error)

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST
      })
    }
  }
}
