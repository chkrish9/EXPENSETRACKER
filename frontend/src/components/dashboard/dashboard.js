import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalContext';
import { DonutChart } from '../chart/donutChart';
import { Knob } from 'primereact/knob';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';

function Dashboard() {
    const { totalExpenses, getIncomes, getExpenses, getTotalByCategories, totalIncome, dashboardDate,
        setDashboardDate, incomes, expenses, totalBalanceInPercentage, setIncomesByMonthAndYear, setExpensesByMonthAndYear } = useGlobalContext();
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

    const maxDate = new Date();
    const options = {
        cutout: '80%'
    };

    const handleDate = async (date) => {
        await setIncomesByMonthAndYear(date);
        await setExpensesByMonthAndYear(date);
        setDashboardDate(date);
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
        getIncomes()
        getExpenses()
        setIncomesByMonthAndYear(dashboardDate);
        setExpensesByMonthAndYear(dashboardDate);
    }, []);


    return (
        <div className="grid grid-nogutter">
            <div className="col-12">
                <div className="card m-3">
                    <Card >
                        <label>Month & Year : </label><Calendar value={dashboardDate} maxDate={maxDate} onChange={(e) => handleDate(e.value)} view="month" dateFormat="mm/yy" />
                    </Card>
                </div>
            </div>
            <div className="col-12 sm:col-12 lg:col-6 xl:col-6">
                <div className="card m-3">
                    <Card title="Remaining Balance">
                        <div className='card flex flex-column justify-content-center align-items-center'>
                            {
                                 !isNaN(totalBalanceInPercentage()) ?  ((typeof totalBalanceInPercentage() === 'number' && totalBalanceInPercentage() >= 0 && totalBalanceInPercentage() <= 100) ?
                                    <Knob value={totalBalanceInPercentage().toFixed(1)} size={300} valueTemplate={'{value}%'} readOnly /> :
                                    <span className={(totalBalanceInPercentage() > 100 ? 'positive':'negative') + " text-8xl my-8"}>{ totalBalanceInPercentage() + "%" }</span>) : ""
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