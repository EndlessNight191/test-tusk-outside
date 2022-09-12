'use strict';

module.exports = {
  async up (queryInterface, DataType) {
    return queryInterface.createTable('tags', {
      id: {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true},

      creator: {type: DataType.INTEGER, primaryKey: true, references: {model: 'users', key: 'id'}, onDelete: 'cascade' },

      name: {type: DataType.STRING(40)},

      sortOrder: {type: DataType.INTEGER, defaultValue: 0},
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('tags');
  }
};
