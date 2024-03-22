import { Response } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import winston from 'winston'

import { voucherService } from '../services/voucherService'
import {
  ICombinedRequest,
  IContextRequest,
  IParamsRequest,
  IUserRequest
} from '../contracts/request'
import { transactionService } from '../services/transactionService'

export const voucherController = {
  getAll: async (
    { context: { user } }: IContextRequest<IUserRequest>,
    res: Response
  ) => {
    try {
      const vouchers = await voucherService.getAll()

      return res.status(StatusCodes.OK).json({
        data: { ...vouchers.map(el => el.toObject()) },
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
  buy: async (
    {
      context: { user },
      params: { voucherId }
    }: ICombinedRequest<
      IUserRequest,
      Record<string, unknown>,
      IParamsRequest<{ voucherId: string }>
    >,
    res: Response
  ) => {
    try {
      const voucher = await voucherService.getById(voucherId)
      if (!voucher) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      const balance = await transactionService.getBalance(user.id)

      if (voucher.price > balance) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ReasonPhrases.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST
        })
      }

      await transactionService.create({
        userId: user.id,
        delta: -voucher.price,
        voucherId: voucher.id
      })

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
  }
}
