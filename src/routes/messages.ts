import { Router } from 'express'

// import { authGuard } from '@/guards'
import { authGuard } from '../guards'

export const message = (router: Router): void => {
  router.post('/message', authGuard.isAuth) // Sends voucher to an email
  router.get('/message/getAll', authGuard.isAuth)
}
