import { createSlice } from "@reduxjs/toolkit";

const initialModeratorState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  moderatorForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const moderatorsSlice = createSlice({
  name: "moderators",
  initialState: initialModeratorState,
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
    // getModeratorById
    moderatorFetched: (state, action) => {
      state.actionsLoading = false;
      state.moderatorForEdit = action.payload.moderatorForEdit;
      state.error = null;
    },
    // findModerators
    moderatorsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    moderatorCreated: (state, action) => {
      
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.moderator);
    },
    // updateModerator
    moderatorUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity._id === action.payload.moderator._id) {
          return action.payload.moderator;
        }
        return entity;
      });
    },
    // deleteModerator
    moderatorDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deleteModerators
    moderatorsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
  },
});
