import React from 'react';
import {useTranslation} from 'react-i18next';
import ReactApexChart from 'react-apexcharts';
import "./resultsChart.css";



const ResultsChart = ({series = []}) => {
    const {t} = useTranslation();
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
            labels: [t("translation:results.needs.certainty"), t("translation:results.needs.variety"), t("translation:results.needs.significance"), t("translation:results.needs.love"), t("translation:results.needs.growth"), t("translation:results.needs.contribution")],
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