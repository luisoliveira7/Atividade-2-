const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

async function getUserByEmail(email) {
    return await User.findOne({ where: { email } });
}

async function createUser(email, password, name) {
    return await User.create({ email, password, name });
}

async function getUserById(id) {
    return await User.findByPk(id);
}

module.exports = { getUserByEmail, createUser, getUserById, User };