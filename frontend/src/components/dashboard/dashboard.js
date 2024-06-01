import React, { useEffect, useState, useMemo } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import { DonutChart } from '../chart/donutChart';

function Dashboard() {
    const { totalExpenses, getIncomes, getExpenses, getTotalByCategories, incomes, expenses, totalIncome, totalBalance } = useGlobalContext();
    const [incomePieChartData, setIncomePieChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
            }
        ]
    });
    const [expensePieChartData, setExpensePieChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
            }
        ]
    });
    const options = {
        cutout: '80%'
    };

    useEffect(() => {
        const data = getTotalByCategories(incomes);
        setIncomePieChartData({
            labels: Object.keys(data),
            datasets: [
                {
                    data: Object.values(data),
                }
            ]
        });
    }, [incomes]);

    useEffect(() => {
        const data = getTotalByCategories(expenses);
        setExpensePieChartData({
            labels: Object.keys(data),
            datasets: [
                {
                    data: Object.values(data),
                }
            ]
        });
    }, [expenses]);

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, []);


    return (
        <div className="grid grid-nogutter">
            <div className='col-12 sm:col-12 lg:col-6 xl:col-6'>
                <h1>Income By Category</h1>
                <DonutChart data={incomePieChartData} options={options} />
            </div>
            <div className='col-12 sm:col-12 lg:col-6 xl:col-6'>
                <h1>Expense By Category</h1>
                <DonutChart data={expensePieChartData} options={options} />
            </div>
            
        </div>
    )
}


export default Dashboard