import { Router } from 'express'

import { authGuard } from '@/guards'
import { userController } from '@/controllers'
import { userValidation } from '@/validations'

export const users = (router: Router): void => {
  router.get('/user/me', authGuard.isAuth, userController.me)
  router.get('/user/me/balance', authGuard.isAuth, userController.meBalance)

  router.post(
    '/user/verification/request',
    authGuard.isAuth,
    userValidation.verificationRequest,
    userController.verificationRequest
  )

  router.post('/user/update', authGuard.isAuth, userController.updateProfile)

  router.get('/user/all', authGuard.isAuth)
  router.get('/user/:userId', authGuard.isAuth, userController.getById)
}
