const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mvc', 'root', '', { dialect: 'mysql' });

module.exports = { sequelize };