import { Voucher } from '@/models'

export const voucherService = {
  getAll: () => Voucher.find(),
  getById: (voucherId: string) => Voucher.findById(voucherId)
}
