const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

async function getAll() {
    return await Expense.findAll();
}

async function getById(id) {
    return await Expense.findByPk(id);
}

async function criar(dados) {
    return await Expense.create({
        title: dados.title,
        amount: dados.amount,
        category: dados.category,
        date: dados.date,
        description: dados.description
    });
}

async function atualizar(id, dados) {
    const expense = await getById(id);
    if (!expense) return null;

    expense.title = dados.title || expense.title;
    expense.amount = dados.amount || expense.amount;
    expense.category = dados.category || expense.category;
    expense.date = dados.date || expense.date;
    expense.description = dados.description || expense.description;

    await expense.save();
    return expense;
}

async function remover(id) {
    const expense = await getById(id);
    if (!expense) return false;

    await expense.destroy();
    return true;
}

async function somaTotal() {
    const expenses = await Expense.findAll();
    let total = 0;
    for (let expense of expenses) {
        total += expense.amount;
    }
    return { total };
}

async function somaPorCategoria() {
    const expenses = await Expense.findAll();
    let categorias = {};
    for (let expense of expenses) {
        if (!categorias[expense.category]) {
            categorias[expense.category] = 0;
        }
        categorias[expense.category] += expense.amount;
    }
    return categorias;
}

module.exports = { getAll, getById, criar, atualizar, remover, somaTotal, somaPorCategoria };