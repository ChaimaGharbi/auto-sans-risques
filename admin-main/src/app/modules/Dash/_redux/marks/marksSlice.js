import { createSlice } from "@reduxjs/toolkit";

const initialMarksState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  markForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const marksSlice = createSlice({
  name: "marks",
  initialState: initialMarksState,
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
    // getMarkById
    markFetched: (state, action) => {
      state.actionsLoading = false;
      state.markForEdit = action.payload.markForEdit;
      state.error = null;
    },
    // findMarks
    marksFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMark
    markCreated: (state, action) => {
      
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.mark);
    },
    // updateMark
    markUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity._id === action.payload.mark._id) {
          return action.payload.mark;
        }
        return entity;
      });
    },
    // deleteMark
    markDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deleteMarks
    marksDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
  },
});
