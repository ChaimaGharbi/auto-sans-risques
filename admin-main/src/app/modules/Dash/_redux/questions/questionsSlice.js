import {createSlice} from "@reduxjs/toolkit";

const initialQuestionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  questionForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState: initialQuestionsState,
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
    // getQuestionById
    questionFetched: (state, action) => {
      state.actionsLoading = false;
      state.questionForEdit = action.payload.questionForEdit;
      state.error = null;
    },
    // findQuestions
    questionsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createQuestion
    questionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.question);
    },
    // updateQuestion
    questionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity._id === action.payload.question._id) {
          return action.payload.question;
        }
        return entity;
      });
    },
    // deleteQuestion
    questionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities;
    },
    // deleteQuestions
    questionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    }
  }
});
