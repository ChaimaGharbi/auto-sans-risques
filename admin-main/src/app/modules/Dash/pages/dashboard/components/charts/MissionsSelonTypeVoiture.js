import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { carsList } from "../../DashUIHelpers";

function MissionsSelonTypeVoiture({ className, dataStats }) {
  const [data, setData] = useState({
    series: [
      {
        data: dataStats,
        name: 'Missions',
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 450,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
                    colors: ['#00E396'],

      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: carsList,
      },
    },
  });
  return (
    <div className={`card card-custom ${className}`}>
      {/* Header */}
      <div className="card-header align-items-center border-0 mt-4">
        <h3 className="card-title align-items-start flex-column">
          <span className="font-weight-bolder text-dark">
            Missions selon les marques de voitures
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

export default MissionsSelonTypeVoiture;
