import { Router } from 'express'
import AuthRouter from './App/Routes/Auth'
import ImgRouter from './App/Routes/Images'
import MeetupsRouter from './App/Routes/Meetups'
import TokenValidation from './middlewares/verifyLogged'

const routes = new Router()

// Router for Authentication
routes.use('/auth', AuthRouter)

// Token Middleware
routes.use(TokenValidation)

// Router for Imgs
routes.use(ImgRouter)

// Router for Meetups
routes.use('/meetups', MeetupsRouter)

export default routes
