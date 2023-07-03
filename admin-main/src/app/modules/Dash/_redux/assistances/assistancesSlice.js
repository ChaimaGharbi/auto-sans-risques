import {createSlice} from "@reduxjs/toolkit";

const initialAssistancesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  assistanceForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const assistancesSlice = createSlice({
  name: "assistances",
  initialState: initialAssistancesState,
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
    // findAssistances
    assistancesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },

    // assistancesUpdateState
    assistancesStatusUpdated: (state, action) => {
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
