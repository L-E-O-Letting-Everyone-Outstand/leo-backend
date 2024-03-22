import { Router } from 'express'

import { auth } from './auth'
import { users } from './users'
import { media } from './media'
import { quest } from './quest'
import { activity } from './activity'
import { voucher } from './voucher'

const router: Router = Router()

const routes: {
  [key: string]: (router: Router) => void
} = { auth, users, media, quest, activity, voucher }

for (const route in routes) {
  routes[route](router)
}

export { router }
