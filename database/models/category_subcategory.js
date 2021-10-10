'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Category_subcategory.belongsTo(models.Category, {
        as: "fk_category",
        foreignKey: "categoryId"
      });

      Category_subcategory.belongsTo(models.Subcategory, {
        as: "fk_subcategory",
        foreignKey: "subcategoryId"
      });

      Category_subcategory.hasMany(models.Product, {
        as: "fk_category_subcategory",
        foreignKey: "categoryId"
      });

    }
  };
  Category_subcategory.init({
    categoryId: DataTypes.INTEGER,
    subcategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category_subcategory',
  });
  return Category_subcategory;
};