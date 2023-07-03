/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ModelsUIHelper";

const ArticlesUIContext = createContext();

export function useArticlesUIContext() {
  return useContext(ArticlesUIContext);
}

export const ArticlesUIConsumer = ArticlesUIContext.Consumer;

export function ArticlesUIProvider({ currentCategoryId, children, history }) {
  const [categoryId, setCategoryId] = useState(currentCategoryId);
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
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
    _id: undefined,
    name: "",
    // content: "",
    // categoryId: categoryId,
  };
  useEffect(() => {
    initArticle.categoryId = currentCategoryId;
    initArticle.carId = currentCategoryId;
    setCategoryId(currentCategoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategoryId]);
  const openNewArticleDialog = () => {
    setSelectedId(undefined);
    setShowEditArticleDialog(true);
  };
  const openEditArticleDialog = (id) => {
    setSelectedId(id);
    setShowEditArticleDialog(true);
  };
  const closeEditArticleDialog = () => {
    setSelectedId(undefined);
    setShowEditArticleDialog(false);
  };
  const [showdeleteModelDialog, setShowdeleteModelDialog] = useState(false);
  const opendeleteModelDialog = (id) => {
    setSelectedId(id);
    setShowdeleteModelDialog(true);
  };
  const closedeleteModelDialog = () => {
    setSelectedId(undefined);
    setShowdeleteModelDialog(false);
  };

  const [showdeleteModelsDialog, setShowdeleteModelsDialog] = useState(false);
  const opendeleteModelsDialog = () => {
    setShowdeleteModelsDialog(true);
  };
  const closedeleteModelsDialog = () => {
    setShowdeleteModelsDialog(false);
  };

  const [showfetchModelsDialog, setShowfetchModelsDialog] = useState(false);
  const openfetchModelsDialog = () => {
    setShowfetchModelsDialog(true);
  };
  const closefetchModelsDialog = () => {
    setShowfetchModelsDialog(false);
  };

  const openAddItemstoArticlePage = (_id) => {
    history.push(`/dash/marks/models/${_id}/add`);
  };

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
    showdeleteModelDialog,
    opendeleteModelDialog,
    closedeleteModelDialog,
    showdeleteModelsDialog,
    opendeleteModelsDialog,
    closedeleteModelsDialog,
    openfetchModelsDialog,
    closefetchModelsDialog,
    showfetchModelsDialog,
    openAddItemstoArticlePage,
  };

  return (
    <ArticlesUIContext.Provider value={value}>
      {children}
    </ArticlesUIContext.Provider>
  );
}
