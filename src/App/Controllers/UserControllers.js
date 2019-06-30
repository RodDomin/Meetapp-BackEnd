import User from '../Models/User'
import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import jwtConfig from '../../Configs/jwtCondig'

class UserController {
  async store (req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6)
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation error' })
    }

    const userExists = await User.findOne({ where: { email: req.body.email } })

    if (userExists) {
      return res.status(401).json({ error: 'user already exists' })
    }

    try {
      const { id, name, email } = await User.create(req.body)
      const token = await jwt.sign({ id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })

      return res.json({ user: { id, name, email }, token })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err })
    }
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      password: Yup.string().min(6),
      oldPassword: Yup.string().min(6).when('password', (password, field) =>
        password ? field.required() : field
      )
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation error' })
    }

    const usr = await User.findByPk(req.userId)

    if (!usr) {
      return res.status(400).json({ error: 'user not found' })
    }

    const { password, oldPassword } = req.body

    if (password && !await usr.checkPassword(oldPassword)) {
      return res.status(401).json({ error: 'password does not match' })
    }

    try {
      const { id, name, email } = await usr.update(req.body)

      return res.json({ user: { id, name, email } })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: 'update failed' })
    }
  }

  remove (req, res) {}
}

export default new UserController()
