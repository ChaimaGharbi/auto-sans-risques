import { createSlice } from "@reduxjs/toolkit";

const initialModelsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  modelForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};

export const modelsSlice = createSlice({
  name: "models",
  initialState: initialModelsState,
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
    // getModelById
    modelFetched: (state, action) => {
      state.actionsLoading = false;
      state.modelForEdit = action.payload.modelForEdit;
      state.error = null;
    },
    // findModels
    modelsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createModel
    modelCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.model);
    },
    // updateModel
    modelUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity._id === action.payload.model._id) {
          return action.payload.model;
        }
        return entity;
      });
    },
    // deleteModel
    modelDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deleteModels
    modelsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      );
    },
  },
});
