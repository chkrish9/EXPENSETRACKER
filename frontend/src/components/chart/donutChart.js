import React from 'react';
import { Chart } from 'primereact/chart';


export const DonutChart = ({data, options}) => {
    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={data} options={options} className="w-full md:w-30rem" />
        </div>
    )
}