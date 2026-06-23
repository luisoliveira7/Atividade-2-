const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'PAGA'),
        allowNull: false,
        defaultValue: 'PENDENTE'
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});

async function getAll(where) {
    return await Expense.findAll({ where });
}

async function getById(id) {
    return await Expense.findByPk(id);
}

async function criar(dados) {
    return await Expense.create(dados);
}

async function atualizar(id, dados) {
    const expense = await getById(id);
    if (!expense) return null;

    expense.descricao = dados.descricao || expense.descricao;
    expense.valor = dados.valor || expense.valor;
    expense.data = dados.data || expense.data;
    expense.status = dados.status || expense.status;
    expense.categoriaId = dados.categoriaId || expense.categoriaId;

    await expense.save();
    return expense;
}

async function remover(id) {
    const expense = await getById(id);
    if (!expense) return false;

    await expense.destroy();
    return true;
}

module.exports = { getAll, getById, criar, atualizar, remover, Expense };