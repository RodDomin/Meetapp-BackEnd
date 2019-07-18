import Sequelize, { Model } from 'sequelize'
import con from '../../Database/index'

class Images extends Model {}

Images.init({
  original_name: Sequelize.STRING,
  name: Sequelize.STRING,
  path: Sequelize.VIRTUAL,
  created_at: Sequelize.DATE,
  updated_at: Sequelize.DATE
}, {
  sequelize: con
})

export default Images
