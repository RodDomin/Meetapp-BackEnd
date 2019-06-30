import { Router } from 'express'
import UserController from '../Controllers/UserControllers'
import verifyLoggedin from '../../middlewares/verifyLogged'
import SessionController from '../Controllers/SessionControllers'

const routes = new Router()

routes.post('/register', UserController.store)
routes.put('/update', verifyLoggedin, UserController.update)
routes.post('/login', SessionController.store)

export default routes
