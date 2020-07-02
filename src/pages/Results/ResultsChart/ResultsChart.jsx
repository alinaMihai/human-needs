import React from 'react';
import ReactApexChart from 'react-apexcharts';
import "./resultsChart.css";

const options =   {
    chart: {
        type: 'donut'
    },
    plotOptions: {
        pie: {
            customScale: 0.9,
          donut: {
            size: '70%'
          },
          
        }
    },
    labels: ["Certainty", "Uncertainty/Variety", "Significance", "Love/Connection", "Growth", "Contribution"],
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    ]
}


const ResultsChart = ({series = []}) => {
    return (
        <div id="chart">
            <ReactApexChart
                options={{...options, series: series}}
                series={series}
                type="donut"/>
        </div>
    )
}

export default ResultsChart;