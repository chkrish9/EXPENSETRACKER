import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { getName, getCode } from '../utils/utilites';
import moment from 'moment';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const DUMMY_USERNAME = process.env.REACT_APP_DUMMY_USERNAME;
const DUMMY_PASSWORD = process.env.REACT_APP_DUMMY_PASSWORD;


const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [dashboardDate, setDashboardDate] = useState(new Date());

    const [incomes, setIncomes] = useState([])
    const [allIncomes, setAllIncomes] = useState([])

    const [expenses, setExpenses] = useState([])
    const [allExpenses, setAllExpenses] = useState([])

    const [error, setError] = useState(null)


    /**
     * User Module
     */
    useEffect(() => {
        if (!isLoggedIn) {
            setIncomes([])
            setExpenses([])
            setError(null)
            setAllIncomes([])
            setAllExpenses([])
            setDashboardDate(new Date())
        }
    }, [isLoggedIn])

    const getUsername = () => {
        return DUMMY_USERNAME;
    }

    const getPassword = () => {
        return DUMMY_PASSWORD;
    }


    /**
     * 
     * Income Module
     */
    const addIncome = async (income) => {
        income["user"] = user;
        await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const updateIncome = async (id, income) => {
        await axios.put(`${BASE_URL}update-income/${id}`,income)
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes/${user}`);
        const data = await getTransationsByMonthAndYear(response.data, dashboardDate);
        setAllIncomes(response.data);
        setIncomes(data);
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

    const setIncomesByMonthAndYear = async (date) => {
        const data = await getTransationsByMonthAndYear(allIncomes, date);
        setIncomes(data);

    }


    /**
     * 
     * Exepense Module 
     */

    const addExpense = async (expense) => {
        expense["user"] = user;
        await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) => {
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const updateExpense = async (id, expense) => {
        await axios.put(`${BASE_URL}update-expense/${id}`,expense)
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses/${user}`);
        const data = await getTransationsByMonthAndYear(response.data, dashboardDate);
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

    const setExpensesByMonthAndYear = async (date) => {
        const data = await getTransationsByMonthAndYear(allExpenses, date);
        setExpenses(data);
    }


    /**
     * 
     * Common Module
     * 
     */
    const getTransationsByMonthAndYear = async (transactions, date) => {
        return transactions.filter((transaction) => {
            const isSameYear = moment(transaction.date).isSame(date, 'year');
            const isSameMonth = moment(transaction.date).isSame(date, 'month');
            if (isSameYear && isSameMonth) {
                return transaction;
            }
        })
    }

    const getTransactionsCategories = (type, field, parentField) => {
        let transactions = [];
        if (type === "incomes") {
            transactions = allIncomes
        } else {
            transactions = allExpenses
        }
        return transactions.reduce((categories, transaction) => {
            if (!categories.find(category => category.code === transaction[field])) {
                categories.push({
                    name: getName(transaction[field]),
                    code: getCode(transaction[field]),
                    parent: parentField ? getCode(transaction[parentField]) : ""
                })
            }
            return categories;
        }, [])
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

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const totalBalanceInPercentage = () => {
        return (totalBalance() / totalIncome()) * 100;
    }

    const resetTransaction = async () => {
        const incomes = await getTransationsByMonthAndYear(allIncomes, new Date());
        const expenses = await getTransationsByMonthAndYear(allExpenses, new Date());
        setDashboardDate(new Date())
        setIncomes(incomes);
        setExpenses(expenses);
    }

    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            isLoggedIn,
            setIsLoggedIn,
            getUsername,
            getPassword,

            dashboardDate,
            setDashboardDate,

            incomes,
            addIncome,
            updateIncome,
            getIncomes,
            deleteIncome,
            totalIncome,
            setIncomesByMonthAndYear,

            expenses,
            addExpense,
            updateExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            setExpensesByMonthAndYear,

            getTransactionsCategories,
            getTotalByCategories,
            totalBalance,
            totalBalanceInPercentage,
            resetTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}