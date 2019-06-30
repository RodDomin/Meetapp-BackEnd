import User from '../Models/User'
import jwt from 'jsonwebtoken'
import * as Yup from 'yup'
import jwtConfig from '../../Configs/jwtCondig'

class SessionController {
  async store (req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation error' })
    }

    const { email, password } = req.body

    const usr = await User.findOne({ where: { email } })

    if (!usr) {
      return res.status(400).json({ error: 'user not found' })
    }

    try {
      if (!(await usr.checkPassword(password))) {
        return res.status(401).json({ error: 'password does not match' })
      }

      const { id, name } = usr

      const token = await jwt.sign({ id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn })

      return res.json({ user: { id, name, email }, token })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'internal server error' })
    }
  }

  async update () {}
}

export default new SessionController()
