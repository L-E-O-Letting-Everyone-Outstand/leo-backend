import { Router } from 'express'

// import { authGuard } from '@/guards'
import { questController } from '@/controllers'
import { authGuard } from '../guards'

export const quest = (router: Router): void => {
  router.post('/quest/create', authGuard.isAuth, questController.create)
  router.get('/quest/all', authGuard.isAuth, questController.getAll)
  router.post('/quest/:questId/take', authGuard.isAuth, questController.take)
  router.post(
    '/quest/:questId/complete',
    authGuard.isAuth,
    questController.complete
  )
  router.get('/quest/:questId', authGuard.isAuth, questController.getById)
  // router.post('/quest/create', authGuard.isAuth, questController.create)
}
