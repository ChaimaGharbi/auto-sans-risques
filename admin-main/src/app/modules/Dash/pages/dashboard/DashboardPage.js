import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DashboardLoadingDialog } from "./dashboard-loading-dialog/DashboardLoadingDialog";
import * as actions from "../../_redux/dashboard/dashboardActions";
import { UsersWidget } from "./components/stats/UsersWidget";
import { RevenueWidget } from "./components/stats/RevenueWidget";
import { MixedWidget1 } from "./components/mixed/MixedWidget1";
import { MissionsWidget } from "./components/stats/MissionsWidget";
import { ExpertsWidget } from "./components/stats/ExpertsWidget";
import MissionsPieChart from "./components/charts/MissionsPieChart";
import ExpertsSelonCitiesChart from "./components/charts/ExpertsSelonCitiesChart";
import MissionsSelonTypeVoiture from "./components/charts/MissionsSelonTypeVoiture";
import Top5ExpertsSelonMissions from "./components/charts/Top5ExpertsSelonMissions";

export function DashboardPage({ history }) {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.dashboard }),
    shallowEqual
  );
  const { data, listLoading } = currentState;

  

  // Dashboard Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    // server call by queryParams
    dispatch(actions.fetchDashboard());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <DashboardLoadingDialog />
      {data && (
        <div className="row">
          <div className="col-lg-6 col-xxl-4">
            <MixedWidget1
              todayClients={data.todayClients}
              todayExperts={data.todayExperts}
              todayMissions={data.todayMissions}
              todayRevenue={data.todayMissions}
              className="card-stretch gutter-b"
            />
          </div>
          <div className="col-lg-6 col-xxl-4">
            <UsersWidget
              users={data.clientWidget.clientsCount}
              usersData={data.clientWidget.clientsData}
              className="card-stretch card-stretch-half gutter-b"
            />
            <ExpertsWidget
              users={data.expertWidget.experts}
              usersData={data.expertWidget.expertsData}
              className="card-stretch card-stretch-half gutter-b"
            />
          </div>
          <div className="col-lg-6 col-xxl-4">
            <RevenueWidget
              revenus={0}
              revenusData={data.missionsWidget.missionsData}
              className="card-stretch card-stretch-half gutter-b"
            />
            <MissionsWidget
              missions={data.missionsWidget.missions}
              missionsData={data.missionsWidget.missionsData}
              className="card-stretch card-stretch-half gutter-b"
            />
          </div>
          <div className="col-lg-6 col-xxl-6">
            <MissionsPieChart dataStats={data.missionsStatsPerEtat} />
          </div>
          <div className="col-lg-6 col-xxl-6">
            <ExpertsSelonCitiesChart dataStats={data.expertsStatsPerCity} />
          </div>
          <div className="col-lg-6 col-xxl-6">
            <MissionsSelonTypeVoiture
              dataStats={data.missionsStatsPerVoitures}
            />
          </div>
          <div className="col-lg-6 col-xxl-6">
            <Top5ExpertsSelonMissions
              dataStats={{
                nomsExperts: data.top5ExpersSelonMissionsNoms,
                missions: data.top5ExpersSelonMissionsNbMissions,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
