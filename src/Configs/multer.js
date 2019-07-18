import Multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export default {
  storage: Multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'Original'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, response) => {
        if (err) return cb(err)

        return cb(null, response.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
