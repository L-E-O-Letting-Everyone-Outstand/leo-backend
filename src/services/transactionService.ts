import { Transaction } from '@/models'

export const transactionService = {
  create: ({
    userId,
    questId,
    voucherId,
    delta
  }: {
    userId: string
    questId?: string
    voucherId?: string
    delta: number
  }) =>
    new Transaction({
      userId,
      questId,
      voucherId,
      delta
    }),
  getBalance: async (userId: string) => {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: userId // match documents with the specific userId
        }
      },
      {
        $group: {
          _id: null, // or _id: "$userId" to group by userId
          totalDelta: { $sum: '$delta' } // Sum the delta values
        }
      }
    ])
    return result[0].totalDelta || 0
  }
}
