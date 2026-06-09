const { Expense } = require('./expense');
const { Category } = require('./category');

Category.hasMany(Expense, {
    foreignKey: 'categoryId',
    as: 'expenses'
});

Expense.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});