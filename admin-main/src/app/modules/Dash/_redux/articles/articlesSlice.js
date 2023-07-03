import {createSlice} from "@reduxjs/toolkit";

const initialArticlesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  articleForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState: initialArticlesState,
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
    // getArticleById
    articleFetched: (state, action) => {
      state.actionsLoading = false;
      state.articleForEdit = action.payload.articleForEdit;
      state.error = null;
    },
    // findArticles
    articlesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createArticle
    articleCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.article);
    },
    // updateArticle
    articleUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.article._id) {
          return action.payload.article;
        }
        return entity;
      });
    },
    // deleteArticle
    articleDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deleteArticles
    articlesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    }
  }
});
