const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

async function getAll() {
    return await Category.findAll();
}

async function getById(id) {
    return await Category.findByPk(id);
}

async function criar(dados) {
    return await Category.create({ name: dados.name });
}

async function atualizar(id, dados) {
    const category = await getById(id);
    if (!category) return null;

    category.name = dados.name || category.name;

    await category.save();
    return category;
}

async function remover(id) {
    const category = await getById(id);
    if (!category) return false;

    await category.destroy();
    return true;
}

module.exports = { getAll, getById, criar, atualizar, remover, Category };