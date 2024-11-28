const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Book', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};