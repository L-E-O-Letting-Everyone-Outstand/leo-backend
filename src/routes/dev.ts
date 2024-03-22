import { Router } from 'express'

import { devController } from '@/seed'

export const auth = (router: Router): void => {
  router.post('/dev/seed', devController.seed)
}
