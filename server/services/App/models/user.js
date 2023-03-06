'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helper/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Item, { foreignKey: 'authorId' })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: { msg: 'Please enter a valid email' },
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' },
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: { args: [5], msg: 'Password must be at least 5 characters' },
        notEmpty: { msg: 'Password is required' },
        notNull: { msg: 'Password is required' },
      },
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeValidate', (user) => {
    user.password = hash(user.password);
  })
  return User;
};