'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE',
      });
      Item.hasMany(models.Ingredient, {foreignKey: 'itemId', onDelete: 'CASCADE'})
      // Item.belongsTo(models.User, {
      //   foreignKey: 'authorId',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'name is required'},
        notNull: {msg: 'name is required'}
      }      
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'description is required'},
        notNull: {msg: 'description is required'}
      }      
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'price is required'},
        notNull: {msg: 'price is required'},
        min: {msg: 'price minimum is 15000', args: [15000]}, 
      }      
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'imgUrl is required'},
        notNull: {msg: 'imgUrl is required'}
      }      
    },
    // authorId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'Users',
    //     key: 'id'
    //   }
    // },
    mongoId: DataTypes.STRING,
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};