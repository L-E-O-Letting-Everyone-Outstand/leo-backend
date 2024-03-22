import { Router } from 'express'

// import { authGuard } from '@/guards'
import { authGuard } from '../guards'
import { voucherController } from '../controllers/voucherController'

export const voucher = (router: Router): void => {
  router.get('/voucher/getAll', authGuard.isAuth, voucherController.getAll)
  router.post(
    '/voucher/:voucherId/buy',
    authGuard.isAuth,
    voucherController.buy
  ) // Sends voucher to an email
}
