const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, updateIncome, deleteIncome } = require('../controllers/income');
const verifyJWT = require('../middleware/verifyJWT')

const router = require('express').Router();

router.use(verifyJWT);

router.post('/add-income', addIncome)
    .get('/get-incomes/:user', getIncomes)
    .put('/update-income/:id',updateIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses/:user', getExpenses)
    .put('/update-expense/:id',updateExpense)
    .delete('/delete-expense/:id', deleteExpense);

module.exports = router;