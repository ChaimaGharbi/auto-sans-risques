/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, createContext, useState, useCallback } from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ArticlesUIHelper";


const ArticlesUIContext = createContext();

export function useArticlesUIContext() {
  return useContext(ArticlesUIContext);
}

export const ArticlesUIConsumer = ArticlesUIContext.Consumer;

export function ArticlesUIProvider({ currentCategoryId, children,history }) {
  const [categoryId, setCategoryId] = useState(currentCategoryId);
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
  const [showEditArticleDialog, setShowEditArticleDialog] = useState(false);
  const initArticle = {
    id: undefined,
    title: "",
    content: "",
    categoryId: categoryId
  };
  useEffect(()=> {
    initArticle.categoryId = currentCategoryId;
    initArticle.carId = currentCategoryId;
    setCategoryId(currentCategoryId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategoryId]);
  const openNewArticleDialog = () => {
    setSelectedId(undefined);
    setShowEditArticleDialog(true);
  };
  const openEditArticleDialog = id => {
    setSelectedId(id);
    setShowEditArticleDialog(true);
  };
  const closeEditArticleDialog = () => {
    setSelectedId(undefined);
    setShowEditArticleDialog(false);
  };
  const [showDeleteArticleDialog, setShowDeleteArticleDialog] = useState(false);
  const openDeleteArticleDialog = id => {
    setSelectedId(id);
    setShowDeleteArticleDialog(true);
  };
  const closeDeleteArticleDialog = () => {
    setSelectedId(undefined);
    setShowDeleteArticleDialog(false);
  };

  const [showDeleteArticlesDialog, setShowDeleteArticlesDialog] = useState(false);
  const openDeleteArticlesDialog = () => {
    setShowDeleteArticlesDialog(true);
  };
  const closeDeleteArticlesDialog = () => {
    setShowDeleteArticlesDialog(false);
  };

  const [showFetchArticlesDialog, setShowFetchArticlesDialog] = useState(false);
  const openFetchArticlesDialog = () => {
    setShowFetchArticlesDialog(true);
  };
  const closeFetchArticlesDialog = () => {
    setShowFetchArticlesDialog(false);
  };

  const openAddItemstoArticlePage= (_id) => {
    history.push(`/dash/categories/articles/${_id}/add`);
  }

  const value = {
    ids,
    setIds,
    categoryId,
    setCategoryId,
    queryParams,
    setQueryParams,
    initArticle,
    selectedId,
    showEditArticleDialog,
    openNewArticleDialog,    
    openEditArticleDialog,
    closeEditArticleDialog,
    showDeleteArticleDialog,
    openDeleteArticleDialog,
    closeDeleteArticleDialog,
    showDeleteArticlesDialog,
    openDeleteArticlesDialog,
    closeDeleteArticlesDialog,
    openFetchArticlesDialog,
    closeFetchArticlesDialog,
    showFetchArticlesDialog,
    openAddItemstoArticlePage
  };
  
  return (
    <ArticlesUIContext.Provider value={value}>
      {children}
    </ArticlesUIContext.Provider>
  );
}
