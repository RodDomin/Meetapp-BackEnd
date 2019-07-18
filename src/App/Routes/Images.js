import { Router } from 'express'
import ImageController from '../Controllers/ImageController'
import Multer from 'multer'
import MulterConfig from '../../Configs/multer'

const upload = Multer(MulterConfig)
const routes = new Router()

routes.post('/images', upload.single('file'), ImageController.store)
routes.put('/images', upload.single('file'), ImageController.update)

export default routes
