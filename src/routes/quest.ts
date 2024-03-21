import { Router } from 'express'

// import { authGuard } from '@/guards'
import { questController } from '@/controllers'
import { authGuard } from '../guards'

export const quest = (router: Router): void => {
  router.post('/quest/create', questController.create)
  router.get('/quest/all', questController.getAll)
  router.post('/quest/:id/take', authGuard.isAuth)
  router.post('/quest/:id/complete', authGuard.isAuth)
  // router.post('/quest/create', authGuard.isAuth, questController.create)
}
