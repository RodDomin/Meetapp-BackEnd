import sharp from 'sharp'
import path from 'path'
import Image from '../Models/Images'

class ImageController {
  async store (req, res) {
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, '..', 'Resized', req.file.filename))

    const bdData = {
      original_name: req.file.originalname,
      name: req.file.filename
    }

    try {
      await Image.create(bdData)

      return res.json(req.file)
    } catch (err) {
      return res.json(err)
    }
  }

  async update (req, res) {
    return res.json({ ok: true })
  }
}

export default new ImageController()
