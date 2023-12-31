import { createSlice } from "@reduxjs/toolkit";

const initialAdsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  adForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const adsSlice = createSlice({
  name: "ads",
  initialState: initialAdsState,
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
    // getAdById
    adFetched: (state, action) => {
      state.actionsLoading = false;
      state.adForEdit = action.payload.adForEdit;
      state.error = null;
    },
    // findAds
    adsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    adCreated: (state, action) => {
      
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.ad);
    },
    // updateAd
    adUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity._id === action.payload.ad._id) {
          return action.payload.ad;
        }
        return entity;
      });
    },
    // deleteAd
    adDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deleteAds
    adsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
  },
});
