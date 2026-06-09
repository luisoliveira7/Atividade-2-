const Expense = require('../models/expense');

function links(id) {
    const base = '/expenses';
    if (id) {
        return [
            { rel: 'self', method: 'GET', href: `${base}/${id}` },
            { rel: 'atualizar', method: 'PUT', href: `${base}/${id}` },
            { rel: 'remover', method: 'DELETE', href: `${base}/${id}` },
            { rel: 'listar', method: 'GET', href: base }
        ];
    }
    return [
        { rel: 'self', method: 'GET', href: base },
        { rel: 'criar', method: 'POST', href: base },
        { rel: 'total', method: 'GET', href: `${base}/summary/total` },
        { rel: 'categoria', method: 'GET', href: `${base}/summary/category` }
    ];
}

function formatar(expense) {
    return {
        id: expense.id,
        title: expense.title,
        amount: expense.amount,
        categoryId: expense.categoryId,
        date: expense.date,
        description: expense.description,
        createdAt: expense.createdAt,
        updatedAt: expense.updatedAt,
        _links: links(expense.id)
    };
}

async function getAll(req, res) {
    const expenses = await Expense.getAll();
    if (!expenses || expenses.length === 0) {
        return res.status(200).json({ message: "Nenhuma despesa cadastrada", _links: links() });
    }
    return res.status(200).json({ data: expenses.map(formatar), _links: links() });
}

async function getById(req, res) {
    const id = req.params.id;
    const item = await Expense.getById(id);
    if (!item) {
        return res.status(404).json({ error: "Não encontrado" });
    }
    return res.status(200).json(formatar(item));
}

async function criar(req, res) {
    const { title, amount, date } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title obrigatório" });
    }
    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Valor inválido" });
    }
    if (!date || new Date(date) > new Date()) {
        return res.status(400).json({ error: "Data inválida" });
    }
    const novo = await Expense.criar(req.body);
    return res.status(201).json(formatar(novo));
}

async function atualizar(req, res) {
    const id = req.params.id;
    const { amount, date } = req.body;
    if (amount && amount <= 0) {
        return res.status(400).json({ error: "Valor inválido" });
    }
    if (date && new Date(date) > new Date()) {
        return res.status(400).json({ error: "Data inválida" });
    }
    const atualizado = await Expense.atualizar(id, req.body);
    if (!atualizado) {
        return res.status(404).json({ error: "Não encontrado" });
    }
    return res.status(200).json(formatar(atualizado));
}

async function remover(req, res) {
    const id = req.params.id;
    const ok = await Expense.remover(id);
    if (!ok) {
        return res.status(404).json({ error: "Não existe" });
    }
    return res.status(200).json({ message: "Removido", _links: links() });
}

async function somaTotal(req, res) {
    const total = await Expense.somaTotal();
    return res.status(200).json({ ...total, _links: links() });
}

async function somaPorCategoria(req, res) {
    const categorias = await Expense.somaPorCategoria();
    return res.status(200).json({ data: categorias, _links: links() });
}

module.exports = { getAll, getById, criar, atualizar, remover, somaTotal, somaPorCategoria };