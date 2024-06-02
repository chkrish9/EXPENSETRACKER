const expenseSchema = require("../models/expense");
exports.addExpense = async (req, res) => {
    const { title, amount, date, category, subCategory, paidBy, description, user } = req.body;

    const expense = expenseSchema({
        title,
        amount,
        date,
        category,
        subCategory,
        paidBy,
        description,
        user
    })

    try {
        if(!title || !amount || !date || !category || !subCategory || !paidBy || !user){
            return res.status(400).json({message: 'All fields are required!'})
        }

        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount should be a positive number!'})
        }
        await expense.save();
        res.status(200).json({message: 'Expense added.'})

    } catch (error) {
        return res.status(500).json({message: 'Server error.'})
    }
}

exports.getExpenses = async (req, res) => {
    const {user} = req.params;
    try {
        const expense = await expenseSchema.find({user:user}).sort({createdAt: -1});
        res.status(200).json(expense)

    } catch (error) {
        return res.status(500).json({message: 'Server error.'})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;

    try {
        const expense = await expenseSchema.findByIdAndDelete(id);
        res.status(200).json({message: 'Expense Deleted'})

    } catch (error) {
        return res.status(500).json({message: 'Server error.'})
    }
}