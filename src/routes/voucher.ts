import { Router } from 'express'

// import { authGuard } from '@/guards'
import { authGuard } from '../guards'

export const voucher = (router: Router): void => {
  router.post('/voucher/buy', authGuard.isAuth) // Sends voucher to an email
  router.post('/voucher/createMany')
}
