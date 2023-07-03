import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function MissionsPieChart({ className, dataStats }) {
  const [data, setData] = useState({
    series: dataStats,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["MISSIONS EN_ATTENTE", "MISSIONS ACCEPTEE", "MISSIONS REFUSEE", "MISSIONS COMPLETEE"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 420,
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
    <div className={`card card-custom ${className}`}>
      {/* Header */}
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="font-weight-bolder text-dark">
          Missions selon l'état
          </span>
        </h3>
      </div>
      {/* Body */}
      <div className="card-body pt-0 align-items-center">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="pie"
          width={550}
        />
      </div>
    </div>
  );
}

export default MissionsPieChart;
