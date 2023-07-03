import {createSlice} from "@reduxjs/toolkit";

const initialExpertsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  expertForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const expertsSlice = createSlice({
  name: "experts",
  initialState: initialExpertsState,
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
    // getExpertById
    expertFetched: (state, action) => {
      state.actionsLoading = false;
      state.expertForEdit = action.payload.expertForEdit;
      state.error = null;
    },
    // findExperts
    expertsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // updateExpert
    expertUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // expertsUpdateState
    expertsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity._id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
