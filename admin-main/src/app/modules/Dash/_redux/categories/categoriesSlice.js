import {createSlice} from "@reduxjs/toolkit";

const initialCategoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  categoryForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
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
    // getCategoryById
    categoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.categoryForEdit = action.payload.categoryForEdit;
      state.error = null;
    },
    // findCategories
    categoriesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCategory
    categoryCreated: (state, action) => {
      
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.category);
    },
    // updateCategory
    categoryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.category._id) {
          return action.payload.category;
        }
        return entity;
      });
    },
    // deleteCategory
    categoryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deleteCategories
    categoriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
  }
});
