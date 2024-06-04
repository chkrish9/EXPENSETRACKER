const incomeSchema = require("../models/income");
exports.addIncome = async (req, res) => {
    const { title, amount, date, category, subCategory, description, account, isRecurrence, user } = req.body;

    const income = incomeSchema({
        title,
        amount,
        date,
        category,
        subCategory,
        account,
        isRecurrence,
        description,
        user
    })

    try {
        if (!title || !amount || !date || !category || !subCategory || !account || !user) {
            return res.status(400).json({ message: 'All fields are required!' })
        }

        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount should be a positive number!' })
        }
        await income.save();
        res.status(200).json({ message: 'Income added.' })

    } catch (error) {
        return res.status(500).json({ message: 'Server error.' })
    }
}

exports.getIncomes = async (req, res) => {
    const { user } = req.params;
    try {
        const incomes = await incomeSchema.find({ user: user }).sort({ createdAt: -1 });
        res.status(200).json(incomes)

    } catch (error) {
        return res.status(500).json({ message: 'Server error.' })
    }
}

exports.updateIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;
        const updateIncome = await incomeSchema.findByIdAndUpdate(incomeId, req.body, { new: true })
        if (!updateIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income updated' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error.' });
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await incomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' })

    } catch (error) {
        return res.status(500).json({ message: 'Server error.' })
    }
}
