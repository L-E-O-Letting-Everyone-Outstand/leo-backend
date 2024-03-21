import { Router } from 'express'

import { authGuard } from '@/guards'
import { userController } from '@/controllers'
import { userValidation } from '@/validations'

export const users = (router: Router): void => {
  router.get('/me', authGuard.isAuth, userController.me)

  router.post(
    '/user/verification/request',
    authGuard.isAuth,
    userValidation.verificationRequest,
    userController.verificationRequest
  )

  router.post(
    '/user/update',
    authGuard.isAuth,
    userValidation.updateProfile,
    userController.updateProfile
  )

  router.get('/user/:id')
  router.get('/user/getAll')
}
