import { Model, ObjectId } from 'mongoose'

export interface ITransaction {
  id: ObjectId
  delta: number
  userId: ObjectId
  questId: ObjectId
  voucherId: ObjectId
}

export interface ITransactionMethods {
  comparePassword: (password: string) => boolean
}

export type TransactionModel = Model<ITransaction, unknown, ITransactionMethods>
