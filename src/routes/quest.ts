import { Router } from 'express'

// import { authGuard } from '@/guards'
import { questController } from '@/controllers'

export const quest = (router: Router): void => {
  router.post('/quest/create', questController.create)
  router.get('/quest/all', questController.getAll)
  // router.post('/quest/create', authGuard.isAuth, questController.create)
}
