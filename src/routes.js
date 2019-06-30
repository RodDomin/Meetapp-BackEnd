import { Router } from 'express'
import AuthRouter from './App/Routes/Auth'

const routes = new Router()

routes.use('/auth', AuthRouter)

export default routes
