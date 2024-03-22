import { Model, ObjectId } from 'mongoose'

export interface IVoucher {
  id: ObjectId
  partner: string
  text: string
  price: number
}

export interface IVoucherMethods {
  comparePassword: (password: string) => boolean
}

export type VoucherModel = Model<IVoucher, unknown, IVoucherMethods>
