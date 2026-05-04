const express = require('express');
const expense = require('./src/views/expense');

const app = express();
app.use(express.json());

app.get('/expenses', expense.getAll);
app.get('/expenses/summary/total', expense.somaTotal);
app.get('/expenses/summary/category', expense.somaPorCategoria);
app.get('/expenses/:id', expense.getById);
app.post('/expenses', expense.criar);
app.put('/expenses/:id', expense.atualizar);
app.delete('/expenses/:id', expense.remover);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});