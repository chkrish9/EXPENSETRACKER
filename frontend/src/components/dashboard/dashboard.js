import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import { DonutChart } from '../chart/donutChart';
import { Knob } from 'primereact/knob';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';

function Dashboard() {
    const { totalExpenses, getIncomes, getExpenses, getTotalByCategories, totalIncome, incomes, expenses, totalBalanceInPercentage, setIncomesByMonthAndYear, setExpensesByMonthAndYear } = useGlobalContext();
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

    const [date, setDate] = useState(new Date());
    const maxDate = new Date();
    const options = {
        cutout: '80%'
    };

    const handleDate = async (date) => {
        await setIncomesByMonthAndYear(date);
        await setExpensesByMonthAndYear(date);
        setDate(date);
    }

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
        if (!incomes || incomes.length === 0) {
            getIncomes()
        }
        if (!expenses || expenses.length === 0) {
            getExpenses()
        }
        setIncomesByMonthAndYear(new Date());
        setExpensesByMonthAndYear(new Date());
    }, []);


    return (
        <div className="grid grid-nogutter">
            <div className="col-12">
                <div className="card m-3">
                    <Card >
                    <label>Month & Year : </label><Calendar value={date} maxDate={maxDate} onChange={(e) => handleDate(e.value)} view="month" dateFormat="mm/yy" />
                    </Card>
                </div>
            </div>
            <div className="col-12 sm:col-12 lg:col-6 xl:col-6">
                <div className="card m-3">
                    <Card title="Remaining Balance">
                        <div className='card flex flex-column justify-content-center align-items-center'>
                            {
                                totalBalanceInPercentage() ? <Knob value={totalBalanceInPercentage().toFixed(1)} size={300} valueTemplate={'{value}%'} readOnly /> : ""
                            }
                        </div>
                    </Card>
                </div>
            </div>
            <div className='col-12 sm:col-12 lg:col-6 xl:col-6'>
                <div className="card m-3">
                    <Card title="Individual Balances">
                        <div className='flex flex-column justify-content-center align-items-center'>
                            {
                                totalIncome() ?
                                    <div className='flex flex-column justify-content-center align-items-center'>
                                        <h1>{totalIncome()}</h1>
                                        <h2>Total Income</h2>
                                    </div> : ""
                            }
                            {
                                totalExpenses() ?
                                    <div className='flex flex-column justify-content-center align-items-center'>
                                        <h1>{totalExpenses()}</h1>
                                        <h2>Total Expense</h2>
                                    </div> : ""
                            }
                        </div>
                    </Card>
                </div>
            </div>
            <div className='col-12 sm:col-12 lg:col-6 xl:col-6'>
                <div className="card m-3">
                    <Card title="Income By Category">
                        <DonutChart data={incomePieChartData} options={options} />
                    </Card>
                </div>
            </div>
            <div className='col-12 sm:col-12 lg:col-6 xl:col-6'>
                <div className="card m-3">
                    <Card title="Expense By Category">
                        <DonutChart data={expensePieChartData} options={options} />
                    </Card>
                </div>
            </div>

        </div>
    )
}


export default Dashboard