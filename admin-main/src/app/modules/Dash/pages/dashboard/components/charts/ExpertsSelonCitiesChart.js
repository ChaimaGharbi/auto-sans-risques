import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { cities } from "../../DashUIHelpers";

function ExpertsSelonCitiesChart({ className, dataStats }) {
  const [data, setData] = useState({
          
    series: [{
      name: 'Experts',
      data: dataStats
    }],
    options: {
      annotations: {
        points: [{
          x: 'Experts',
          seriesIndex: 0,
          label: {
            borderColor: '#775DD0',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: 'Experts',
          }
        }]
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '50%',
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },
      
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2']
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: cities,
        tickPlacement: 'on'
      },
      yaxis: {
        title: {
          text: 'Experts',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        },
      }
    },
  
  
  });
  return (
    <div className={`card card-custom ${className}`}>
      {/* Header */}
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="font-weight-bolder text-dark">
          Experts selon régions
          </span>
        </h3>
      </div>
      {/* Body */}
      <div className="card-body pt-0 align-items-center">

        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          width={550}
        />
      </div>
    </div>
  );
}

export default ExpertsSelonCitiesChart;
