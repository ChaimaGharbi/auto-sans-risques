import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function Top5ExpertsSelonMissions({ className, dataStats }) {
  const [data, setData] = useState({
    series: dataStats.missions,
    options: {
      chart: {
        type: "polarArea",
      },
      labels: dataStats.nomsExperts,
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  return (
    <div className={`card tw-mt-2 card-custom ${className}`}>
      {/* Header */}
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="font-weight-bolder text-dark">
          Top 5 Experts selon les nombres des missions
          </span>
        </h3>
      </div>
      {/* Body */}
      <div className="card-body pt-0 align-items-center">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="polarArea"
          width={500}
        />
      </div>
    </div>
  );
}

export default Top5ExpertsSelonMissions;
