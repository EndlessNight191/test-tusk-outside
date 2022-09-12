'use strict';

module.exports = {
  async up (queryInterface, DataType) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('users', {
      id: {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true},

      email: {type: DataType.STRING(100), unique: true},

      password: {type: DataType.STRING(100)},

      nickname: {type: DataType.STRING(30), unique: true},

      access_token: {type: DataType.STRING(), allowNull: true},

      refresh_token: {type: DataType.STRING(), allowNull: true},
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('users');
  }
};
