import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./RapportcategoriesUIHelpers";

const RapportcategoriesUIContext = createContext();

export function useRapportcategoriesUIContext() {
  return useContext(RapportcategoriesUIContext);
}

export const RapportcategoriesUIConsumer = RapportcategoriesUIContext.Consumer;

export function RapportcategoriesUIProvider({rapportcategoriesUIEvents, children}) {
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

  const initRapportcategory = {
    _id: undefined,
    category_name: "",
    priority: 0
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initRapportcategory,
    newRapportcategoryButtonClick: rapportcategoriesUIEvents.newRapportcategoryButtonClick,
    openEditRapportcategoryDialog: rapportcategoriesUIEvents.openEditRapportcategoryDialog,
    openDeleteRapportcategoryDialog: rapportcategoriesUIEvents.openDeleteRapportcategoryDialog,
    openAddQuestionsToRapportcategoryDialog: rapportcategoriesUIEvents.openAddQuestionsToRapportcategoryDialog,
    openDeleteRapportcategoriesDialog: rapportcategoriesUIEvents.openDeleteRapportcategoriesDialog,
    openFetchRapportcategoriesDialog: rapportcategoriesUIEvents.openFetchRapportcategoriesDialog,
    openUpdateRapportcategoriesStatusDialog: rapportcategoriesUIEvents.openUpdateRapportcategoriesStatusDialog,
    openFetchRapportcategoriesDetailsDialog: rapportcategoriesUIEvents.openFetchRapportcategoriesDetailsDialog
  };

  return <RapportcategoriesUIContext.Provider value={value}>{children}</RapportcategoriesUIContext.Provider>;
}