/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useMemo, useEffect} from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import {useHtmlClassService} from "../../../../../../../_metronic/layout";
import {toAbsoluteUrl} from "../../../../../../../_metronic/_helpers";

export function ExpertsWidget({ className,users,usersData }) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBasePrimary: objectPath.get(
        uiService.config,
        "js.colors.theme.base.primary"
      ),
      colorsThemeLightPrimary: objectPath.get(
        uiService.config,
        "js.colors.theme.light.primary"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily")
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById("kt_stats_widget_12x_chart");

    if (!element) {
      return;
    }

    const options = getChartOption(layoutProps,usersData);
    const chartnewUsers = new ApexCharts(element, options);
    chartnewUsers.render();
    return function cleanUp() {
      chartnewUsers.destroy();
    };
  }, [layoutProps]);

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-body d-flex flex-column p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
          <span className="symbol symbol-circle symbol-50 symbol-light-primary mr-2">
            <span className="symbol-label">
              <span className="svg-icon svg-icon-xl svg-icon-primary">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Communication/Group.svg"
                  )}
                ></SVG>
              </span>
            </span>
          </span>
          <div className="d-flex flex-column text-right">
            <span className="text-dark-75 font-weight-bolder font-size-h3">
              +{users}
            </span>
            <span className="text-muted font-weight-bold mt-2">Tous les Experts</span>
          </div>
        </div>
        <div
          id="kt_stats_widget_12x_chart"
          className="card-rounded-bottom"
          style={{ height: "150px",background:"white" }}
        ></div>
      </div>
    </div>
  );
}

function getChartOption(layoutProps,usersData) {
  var options = {
    series: [
      {
        name: "Clients",
        data: usersData
      }
    ],
    chart: {
      type: "area",
      height: 150,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {},
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "solid",
      opacity: 1
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [layoutProps.colorsThemeBasePrimary]
    },
    xaxis: {
      categories: ["Il y a 6 jour", "Il y a 5 jour", "Il y a 4 jour", "Il y a 3 jour", "Il y a 2 jour", "Il y a 1 jour", "Aujourd'hui"],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3
        }
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    yaxis: {
      min: Math.min(...usersData),
      max: Math.max(...usersData)+5,
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0
        }
      },
      hover: {
        filter: {
          type: "none",
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily
      },
      y: {
        formatter: function(val) {
          return  val + " users";
        }
      }
    },
    colors: [layoutProps.colorsThemeLightPrimary],
    markers: {
      colors: [layoutProps.colorsThemeLightPrimary],
      strokeColor: [layoutProps.colorsThemeBasePrimary],
      strokeWidth: 3
    }
  };
  return options;
}
