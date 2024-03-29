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
      Item.hasMany(models.OrderDetail, {
        foreignKey: 'item_id'
      })
    }
  }
  Item.init({
    // item_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image_link: DataTypes.TEXT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};