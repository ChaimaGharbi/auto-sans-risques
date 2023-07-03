/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, createContext, useState, useCallback } from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./QuestionsUIHelper";


const QuestionsUIContext = createContext();

export function useQuestionsUIContext() {
  return useContext(QuestionsUIContext);
}

export const QuestionsUIConsumer = QuestionsUIContext.Consumer;

export function QuestionsUIProvider({ currentRapportcategoryId, children,history }) {
  const [categoryId, setQuestions_categoryId] = useState(currentRapportcategoryId);
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);
  const [selectedId, setSelectedId] = useState(null);
  const [showEditQuestionDialog, setShowEditQuestionDialog] = useState(false);
  const initQuestion = {
    id: undefined,
    question: "",
    choices: [],
    typeInput: "Text",
    categoryId: categoryId
  };
  useEffect(()=> {
    initQuestion.categoryId = currentRapportcategoryId;
    initQuestion.carId = currentRapportcategoryId;
    setQuestions_categoryId(currentRapportcategoryId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRapportcategoryId]);
  const openNewQuestionDialog = () => {
    setSelectedId(undefined);
    setShowEditQuestionDialog(true);
  };
  const openEditQuestionDialog = id => {
    setSelectedId(id);
    setShowEditQuestionDialog(true);
  };
  const closeEditQuestionDialog = () => {
    setSelectedId(undefined);
    setShowEditQuestionDialog(false);
  };
  const [showDeleteQuestionDialog, setShowDeleteQuestionDialog] = useState(false);
  const openDeleteQuestionDialog = id => {
    setSelectedId(id);
    setShowDeleteQuestionDialog(true);
  };
  const closeDeleteQuestionDialog = () => {
    setSelectedId(undefined);
    setShowDeleteQuestionDialog(false);
  };

  const [showDeleteQuestionsDialog, setShowDeleteQuestionsDialog] = useState(false);
  const openDeleteQuestionsDialog = () => {
    setShowDeleteQuestionsDialog(true);
  };
  const closeDeleteQuestionsDialog = () => {
    setShowDeleteQuestionsDialog(false);
  };

  const [showFetchQuestionsDialog, setShowFetchQuestionsDialog] = useState(false);
  const openFetchQuestionsDialog = () => {
    setShowFetchQuestionsDialog(true);
  };
  const closeFetchQuestionsDialog = () => {
    setShowFetchQuestionsDialog(false);
  };

  const openAddItemstoQuestionPage= (_id) => {
    history.push(`/dash/questions_rapportcategories/questions/${_id}/add`);
  }

  const value = {
    ids,
    setIds,
    categoryId,
    setQuestions_categoryId,
    queryParams,
    setQueryParams,
    initQuestion,
    selectedId,
    showEditQuestionDialog,
    openNewQuestionDialog,    
    openEditQuestionDialog,
    closeEditQuestionDialog,
    showDeleteQuestionDialog,
    openDeleteQuestionDialog,
    closeDeleteQuestionDialog,
    showDeleteQuestionsDialog,
    openDeleteQuestionsDialog,
    closeDeleteQuestionsDialog,
    openFetchQuestionsDialog,
    closeFetchQuestionsDialog,
    showFetchQuestionsDialog,
    openAddItemstoQuestionPage
  };
  
  return (
    <QuestionsUIContext.Provider value={value}>
      {children}
    </QuestionsUIContext.Provider>
  );
}
