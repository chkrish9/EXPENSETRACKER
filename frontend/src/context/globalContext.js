import React, { useContext, useState } from "react"
import { getName, getCode } from '../utils/utilites';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios, { axiosPrivate } from "../utils/axios";

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


 
    axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error)
    );

    axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                setToken(newAccessToken);
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }
    );
    /**
     * User Module
     */
    const login = async (user) => {
        return await axios.post(`auth`, user, {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true
        }).catch((err) => {
            console.error(err.response.data.message)
        })
    }

    const refresh = async () => {
        const response = await axiosPrivate.get('auth/refresh', {
            withCredentials: true
        });
        setUser(localStorage.getItem("username"));
        return response.data.accessToken;
    }

    const logout = async () => {
        await axios.post(`auth/logout`).catch((err) => {
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
        await axiosPrivate.post(`transactions/add-income`, income)
            .catch((err) => {
                console.error(err.response.data.message)
            })
        getIncomes()
    }

    const updateIncome = async (id, income) => {
        await axiosPrivate.put(`transactions/update-income/${id}`, income)
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axiosPrivate.get(`transactions/get-incomes/${user}`);
        const data = await getTransactionsByMonthAndYear(response.data, dashboardDate);
        setAllIncomes(response.data);
        setIncomes(data);
    }

    const deleteIncome = async (id) => {
        await axiosPrivate.delete(`transactions/delete-income/${id}`)
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
        const data = await getTransactionsByMonthAndYear(allIncomes, date);
        setIncomes(data);

    }


    /**
     * 
     * Exepense Module 
     */

    const addExpense = async (expense) => {
        expense["user"] = user;
        await axiosPrivate.post(`transactions/add-expense`, expense)
            .catch((err) => {
                console.error(err.response.data.message)
            })
        getExpenses()
    }

    const updateExpense = async (id, expense) => {
        await axiosPrivate.put(`transactions/update-expense/${id}`, expense)
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axiosPrivate.get(`transactions/get-expenses/${user}`);
        const data = await getTransactionsByMonthAndYear(response.data, dashboardDate);
        setAllExpenses(response.data);
        setExpenses(data);
    }

    const deleteExpense = async (id) => {
        await axiosPrivate.delete(`transactions/delete-expense/${id}`)
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
        const data = await getTransactionsByMonthAndYear(allExpenses, date);
        setExpenses(data);
    }


    /**
     * 
     * Common Module
     * 
     */
    const getTransactionsByMonthAndYear = async (transactions, date) => {
        return transactions.filter((transaction) => {
            date = moment(date).local();
            const isSameYear = moment(transaction.date).local().isSame(date, 'year');
            const isSameMonth = moment(transaction.date).local().isSame(date, 'month');
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
        const incomes = await getTransactionsByMonthAndYear(allIncomes, new Date());
        const expenses = await getTransactionsByMonthAndYear(allExpenses, new Date());
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
