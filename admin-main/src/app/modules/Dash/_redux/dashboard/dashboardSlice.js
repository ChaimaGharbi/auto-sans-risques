import {createSlice} from "@reduxjs/toolkit";

const initialDashboardState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  dashboardForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // findDashboard
    dashboardFetched: (state, action) => {
      const { data } = action.payload;
      
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    
  }
});
