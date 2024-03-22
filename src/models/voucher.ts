import { Schema, model } from 'mongoose'

import { IVoucher, VoucherModel } from '@/contracts/voucher'

const schema = new Schema<IVoucher, VoucherModel>(
  {
    partner: String,
    text: String,
    price: Number
  },
  { timestamps: true }
)

export const Voucher = model<IVoucher, VoucherModel>('Voucher', schema)
