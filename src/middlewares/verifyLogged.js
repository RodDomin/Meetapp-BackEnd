import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import jwtConfig from '../Configs/jwtCondig'

export default async function (req, res, next) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'token not found' })
  }

  const [, token] = authorization.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, jwtConfig.secret)

    req.userId = decoded.id

    return next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'token not valid' })
  }
}
