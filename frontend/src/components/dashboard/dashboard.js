import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import { DonutChart } from '../chart/donutChart';
import { Knob } from 'primereact/knob';

function Dashboard() {
    const { totalExpenses, getIncomes, getExpenses, getTotalByCategories, incomes, expenses, totalIncome, totalBalanceInPercentage } = useGlobalContext();
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
        const data = getTotalByCategories(incomes, "category");
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
        const data = getTotalByCategories(expenses, "category");
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
        if(!incomes || incomes.length === 0){
            getIncomes()
        }
        if(!expenses || expenses.length === 0){
            getExpenses()
        }
    }, []);


    return (
        <div className="grid grid-nogutter">
            <div className="col-12 sm:col-12 lg:col-6 xl:col-6">
            <h1>Total Balance</h1>
                <div className='card flex flex-column justify-content-center align-items-center'>
                    {
                        totalBalanceInPercentage() ? <Knob value={totalBalanceInPercentage().toFixed(1)} size={500} valueTemplate={'{value}%'} readOnly />:""
                    }
                </div>
            </div>
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