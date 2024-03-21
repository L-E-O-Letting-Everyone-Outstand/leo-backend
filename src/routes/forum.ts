import { Router } from 'express'

// import { authGuard } from '@/guards'
import { authGuard } from '../guards'

export const forum = (router: Router): void => {
  router.post('/forum/discussion/create', authGuard.isAuth)
  router.get('/forum/discussion/comment', authGuard.isAuth)
}
