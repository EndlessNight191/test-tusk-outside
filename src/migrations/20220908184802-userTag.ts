'use strict';
import { QueryInterface, DataType, QueryTypes } from 'sequelize';

module.exports = {
  async up (queryInterface, DataType) {
    return queryInterface.createTable('userTag', {
      id: {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true},

      user_id: {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true},

      tag_id: {type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('userTag');
  }
};
