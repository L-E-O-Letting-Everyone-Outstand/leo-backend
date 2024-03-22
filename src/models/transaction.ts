import { Schema, model } from 'mongoose'

import { ITransaction, TransactionModel } from '@/contracts/transaction'

const schema = new Schema<ITransaction, TransactionModel>(
  {
    delta: Number,
    questId: { type: Schema.Types.ObjectId, ref: 'Quest' },
    voucherId: { type: Schema.Types.ObjectId, ref: 'Voucher' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

export const Transaction = model<ITransaction, TransactionModel>(
  'Transaction',
  schema
)
