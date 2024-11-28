const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Book = require('./book')(sequelize);
const Order = require('./order')(sequelize);
const User = require('./user')(sequelize);

sequelize.sync();

module.exports = { sequelize, Book, Order, User };