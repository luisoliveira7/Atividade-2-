const fs = require('fs').promises;

async function lerArquivo() {
    try {
        const data = await fs.readFile('expenses.json', 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

async function escreverArquivo(data) {
    try {
        await fs.writeFile('expenses.json', JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
        console.error(e);
    }
}

function criarExpense(dados, id) {
    return {
        id: String(id),
        title: dados.title,
        amount: dados.amount,
        category: dados.category,
        date: dados.date,
        description: dados.description,
        createdAt: new Date()
    };
}

async function getAll() {
    return await lerArquivo();
}

async function getById(id) {
    const expenses = await lerArquivo();
    for (let expense of expenses) {
        if (expense.id === String(id)) {
            return expense;
        }
    }
    return null;
}

async function criar(dados) {
    const expenses = await lerArquivo();
    let id = 0;
    for (let expense of expenses) {
        if (id < Number(expense.id)) {
            id = Number(expense.id);
        }
    }
    const novo = criarExpense(dados, id + 1);
    expenses.push(novo);
    await escreverArquivo(expenses);
    return novo;
}

async function atualizar(id, dados) {
    const expenses = await lerArquivo();
    for (let expense of expenses) {
        if (expense.id === String(id)) {
            expense.title = dados.title || expense.title;
            expense.amount = dados.amount || expense.amount;
            expense.category = dados.category || expense.category;
            expense.date = dados.date || expense.date;
            expense.description = dados.description || expense.description;
            await escreverArquivo(expenses);
            return expense;
        }
    }
    return null;
}

async function remover(id) {
    const expenses = await lerArquivo();
    let novoVetor = [];
    let existe = false;
    for (let expense of expenses) {
        if (expense.id === String(id)) {
            existe = true;
        } else {
            novoVetor.push(expense);
        }
    }
    if (existe) {
        await escreverArquivo(novoVetor);
    }
    return existe;
}

async function somaTotal() {
    const expenses = await lerArquivo();
    let total = 0;
    for (let expense of expenses) {
        total += expense.amount;
    }
    return { total };
}

async function somaPorCategoria() {
    const expenses = await lerArquivo();
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