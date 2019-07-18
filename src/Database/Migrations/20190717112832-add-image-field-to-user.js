module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'image_id', {
      type: Sequelize.INTEGER,
      references: { model: 'images', key: 'id' },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'image_id')
  }
}
