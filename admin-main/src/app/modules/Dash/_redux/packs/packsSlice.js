import {createSlice} from "@reduxjs/toolkit";

const initialPacksState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  packForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const packsSlice = createSlice({
  name: "packs",
  initialState: initialPacksState,
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
    // getPackById
    packFetched: (state, action) => {
      state.actionsLoading = false;
      state.packForEdit = action.payload.packForEdit;
      state.error = null;
    },
    // findPacks
    packsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    packCreated: (state, action) => {
      
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.pack);
    },
    // updatePack
    packUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.pack._id) {
          return action.payload.pack;
        }
        return entity;
      });
    },
    // deletePack
    packDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deletePacks
    packsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
  }
});
