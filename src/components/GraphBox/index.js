import React, { useState } from 'react'
import Chart from "react-apexcharts";

function GraphBox({title, color, data}) {
    const [options, setOptions] = useState(
    { 
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false
            }
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            },
            categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12, 13,14,15,16,17,18,19,20]
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        grid: {
            xaxis: {
                lines: {
                show: false,
                }
            },
            yaxis: {
                lines: {
                show: false,
                }
            },
        },
        dataLabels: {
            enabled: false
        }
    })
      
    const [series, setSeries] = useState([
        {
            name: "series-1",
            data: data
        }
    ])
    return (
        <div className="flex flex-col justify-center items-center border border-gray-500 p-4">
            <h1>{title}</h1>
            <Chart
                options = {options}
                series = {series}
                type="bar"
                width="300"
                height="150"
            />
        </div>
    )
}

export default GraphBox
