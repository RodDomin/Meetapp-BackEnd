import Sequelize, { Model } from 'sequelize'
import User from './User'
import Images from './Images'
import con from '../../Database/index'

class Meetup extends Model {
  static associate () {
    this.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
    this.belongsTo(Images, { foreignKey: 'image_id', as: 'image' })
  }
}

Meetup.init({
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  location: Sequelize.STRING,
  time: Sequelize.DATE,
  user_id: { type: Sequelize.INTEGER },
  image_id: { type: Sequelize.INTEGER }
}, {
  sequelize: con
})

export default Meetup
