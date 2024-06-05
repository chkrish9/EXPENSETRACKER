import React, { useContext, useState } from "react"
import axios from 'axios'
import { getName, getCode } from '../utils/utilites';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_BASE_URL;


const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const [dashboardDate, setDashboardDate] = useState(new Date());

    const [incomes, setIncomes] = useState([])
    const [allIncomes, setAllIncomes] = useState([])

    const [expenses, setExpenses] = useState([])
    const [allExpenses, setAllExpenses] = useState([])

    const header = () => {
        return {
            'Authorization': `Bearer ${token}` 
        }
    } 


    /**
     * User Module
     */
    const login = async (user) => {
        return await axios.post(`${BASE_URL}auth`, user, { headers : {
             withCredentials: true // Necessary to receive cookies
        }}).catch((err) => {
            console.error(err.response.data.message)
        })
    }

    const refresh = async (user) => {
        return await axios.get(`${BASE_URL}auth/refresh`, user).catch((err) => {
            console.error(err.response.data.message)
        })
    }

    const logout = async () => {
        await axios.post(`${BASE_URL}auth/logout`).catch((err) => {
            console.error(err.response.data.message)
        })
        navigate('/login')
    }


    /**
     * 
     * Income Module
     */
    const addIncome = async (income) => {
        income["user"] = user;
        await axios.post(`${BASE_URL}transactions/add-income`, income, { headers: header() })
            .catch((err) => {
                console.error(err.response.data.message)
            })
        getIncomes()
    }

    const updateIncome = async (id, income) => {
        await axios.put(`${BASE_URL}transactions/update-income/${id}`, income, { headers: header() })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}transactions/get-incomes/${user}`, { headers: header() });
        const data = await getTransationsByMonthAndYear(response.data, dashboardDate);
        setAllIncomes(response.data);
        setIncomes(data);
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}transactions/delete-income/${id}`, { headers: header() })
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
        await axios.post(`${BASE_URL}transactions/add-expense`, expense, { headers: header() })
            .catch((err) => {
                console.error(err.response.data.message)
            })
        getExpenses()
    }

    const updateExpense = async (id, expense) => {
        await axios.put(`${BASE_URL}transactions/update-expense/${id}`, expense, { headers: header() })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}transactions/get-expenses/${user}`, { headers: header() });
        const data = await getTransationsByMonthAndYear(response.data, dashboardDate);
        setAllExpenses(response.data);
        setExpenses(data);
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}transactions/delete-expense/${id}`, { headers: header() })
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
            token,
            setToken,
            login,
            logout,
            refresh,

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
