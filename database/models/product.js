'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Subcategory, {
        as: "fk_subcategory",
        foreignKey: "subcategoryId"
      });

      Product.hasMany(models.Image, {
        as: "fk_image",
        foreignKey: "productId"
      });
    }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING,
    shipping: DataTypes.BOOLEAN,
    featured: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    subcategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};