const express = require('express');
const expense = require('./src/views/expense');
const category = require('./src/views/category');
const user = require('./src/views/user');
const authMiddleware = require('./src/middleware/auth');
const { sequelize } = require('./src/models/db');
require('./src/models/associations');

const app = express();
app.use(express.json());

app.post('/users/register', user.register);
app.post('/users/login', user.login);

app.use(authMiddleware);

app.get('/expenses', expense.getAll);
app.get('/expenses/summary/total', expense.somaTotal);
app.get('/expenses/summary/category', expense.somaPorCategoria);
app.get('/expenses/:id', expense.getById);
app.post('/expenses', expense.criar);
app.put('/expenses/:id', expense.atualizar);
app.delete('/expenses/:id', expense.remover);

app.get('/categories', category.getAll);
app.get('/categories/:id', category.getById);
app.post('/categories', category.criar);
app.put('/categories/:id', category.atualizar);
app.delete('/categories/:id', category.remover);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando em http://localhost:3000");
    });
});