const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

async function getUserByEmail(email) {
    return await User.findOne({ where: { email } });
}

async function createUser(nome, email, senha) {
    return await User.create({ nome, email, senha });
}

async function getUserById(id) {
    return await User.findByPk(id);
}

module.exports = { getUserByEmail, createUser, getUserById, User };