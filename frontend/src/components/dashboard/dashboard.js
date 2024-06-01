import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/globalContext';

function Dashboard() {
    const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    return (
        <h1>Dashboard</h1>
    )
}


export default Dashboard