import {createSlice} from "@reduxjs/toolkit";

const initialRapportcategoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  rapportcategoryForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const rapportcategoriesSlice = createSlice({
  name: "rapportcategories",
  initialState: initialRapportcategoriesState,
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
    // getRapportcategoryById
    rapportcategoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.rapportcategoryForEdit = action.payload.rapportcategoryForEdit;
      state.error = null;
    },
    // findRapportcategories
    rapportcategoriesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRapportcategory
    rapportcategoryCreated: (state, action) => {
      
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.rapportcategory);
    },
    // updateRapportcategory
    rapportcategoryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.rapportcategory._id) {
          return action.payload.rapportcategory;
        }
        return entity;
      });
    },
    // deleteRapportcategory
    rapportcategoryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deleteRapportcategories
    rapportcategoriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
  }
});
