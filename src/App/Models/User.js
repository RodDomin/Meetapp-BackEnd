import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'
import con from '../../Database/index'

class User extends Model {
  async checkPassword (password) {
    console.log(password, this.password_hash)
    if (!(await bcrypt.compare(password, this.password_hash))) {
      return false
    }
    return true
  }
}

User.init({
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.VIRTUAL,
  password_hash: Sequelize.STRING
}, { sequelize: con })

User.addHook('beforeSave', async user => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8)
  }
})

export default User
