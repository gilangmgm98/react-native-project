'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredient.belongsTo(models.Item, {foreignKey: 'itemId', onDelete: 'CASCADE'});
    }
  }
  Ingredient.init({
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Items',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'name is required'},
        notNull: {msg: 'name is required'}
      }      
    }
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};