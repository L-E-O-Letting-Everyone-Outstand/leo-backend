import { Router } from 'express'

// import { authGuard } from '@/guards'
import { activityController } from '@/controllers'
import { authGuard } from '../guards'

export const activity = (router: Router): void => {
  router.post('/activity/create', authGuard.isAuth, activityController.create)
  router.get('/activity/all', activityController.getAll)
  router.post(
    '/activity/:activityId/join',
    authGuard.isAuth,
    activityController.join
  )
  router.get(
    '/activity/:activityId',
    authGuard.isAuth,
    activityController.getById
  )
  // router.post('/quest/create', authGuard.isAuth, questController.create)
}
