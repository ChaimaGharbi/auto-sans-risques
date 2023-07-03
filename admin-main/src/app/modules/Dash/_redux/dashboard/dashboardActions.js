import * as requestFromServer from "./dashboardCrud";
import {dashboardSlice, callTypes} from "./dashboardSlice";

const {actions} = dashboardSlice;

export const fetchDashboard = () => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDashboard()
    .then(response => {
      
      const data = response.data;
      dispatch(actions.dashboardFetched({ data }));
    })
    .catch(error => {
      
      error.clientMessage = "Can't load dashboard";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
