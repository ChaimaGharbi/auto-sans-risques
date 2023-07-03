import {createSlice} from "@reduxjs/toolkit";

const initialAvisState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  avisForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const avisSlice = createSlice({
  name: "avis",
  initialState: initialAvisState,
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
    // getAvisDetailsById
    avisDetailsFetched: (state, action) => {
      state.actionsLoading = false;
      state.avisDetails = action.payload.avisDetails;
      state.error = null;
    },
    // findAvis
    avisFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    avisDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    avissDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // avisUpdateState
    avisStatusUpdated: (state, action) => {
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
