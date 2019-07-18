import { Router } from 'express'
import MeetupController from '../Controllers/MeetupController'

const routes = new Router()

routes.get('/', MeetupController.index)
routes.put('/update', MeetupController.update)
routes.post('/create', MeetupController.store)

export default routes
