import React, { useContext, useState } from "react"
import axios from 'axios'
import { getName, getCode } from '../utils/utilites';
import moment from 'moment';

const BASE_URL = process.env.REACT_APP_BASE_URL;


const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [allIncomes, setAllIncomes] = useState([])
    const [allExpenses, setAllExpenses] = useState([])

    //calculate incomes
    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`);
        const data = await getTransationsByMonthAndYear(response.data, new Date());
        setAllIncomes(response.data);
        setIncomes(data);
    }

    const getTransationsByMonthAndYear = async (transactions, date) => {
        return transactions.filter((transaction) => {
            const isSameYear = moment(transaction.date).isSame(date, 'year');
            const isSameMonth = moment(transaction.date).isSame(date, 'month');
            if (isSameYear && isSameMonth) {
                return transaction;
            }
        })
    }

    const setIncomesByMonthAndYear = async (date) => {
        const data = await getTransationsByMonthAndYear(allIncomes, date);
        setIncomes(data);

    }

    const setExpensesByMonthAndYear = async (date) => {
        const data = await getTransationsByMonthAndYear(allExpenses, date);
        setExpenses(data);
    }

    const resetTransaction = async () => {
        const incomes = await getTransationsByMonthAndYear(allIncomes, new Date());
        setIncomes(incomes);
        const expenses = await getTransationsByMonthAndYear(allExpenses, new Date());
        setExpenses(expenses);
    }

    const getTotalByCategories = (transactions, category) => {
        if (!transactions || (transactions && transactions.length === 0)) return [];
        return transactions.reduce((totals, transaction) => {
            if (!totals[transaction[category]]) {
                totals[transaction[category]] = transaction.amount;
            } else {
                totals[transaction[category]] = totals[transaction[category]] + transaction.amount;
            }
            return totals;
        }, {})
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate expenses
    const addExpense = async (income) => {
        await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`);
        const data = await getTransationsByMonthAndYear(response.data, new Date());
        setAllExpenses(response.data);
        setExpenses(data);
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const totalBalanceInPercentage = () => {
        return (totalExpenses() / totalIncome()) * 100;
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    const getTransactionsCategories = (transactions) => {
        return transactions.reduce((categories, transaction) => {
            if (!categories.find(category => category.code === transaction.category)) {
                categories.push({
                    name: getName(transaction.category),
                    code: getCode(transaction.category)
                })
            }
            return categories;
        }, [])
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            setIncomesByMonthAndYear,
            setExpensesByMonthAndYear,
            resetTransaction,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            totalBalanceInPercentage,
            transactionHistory,
            getTotalByCategories,
            error,
            getTransactionsCategories,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}