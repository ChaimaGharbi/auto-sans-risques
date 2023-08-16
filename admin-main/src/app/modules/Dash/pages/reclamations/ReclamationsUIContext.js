import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ReclamationsUIHelpers";

const ReclamationsUIContext = createContext();

export function useReclamationsUIContext() {
  return useContext(ReclamationsUIContext);
}

export const ReclamationsUIConsumer = ReclamationsUIContext.Consumer;

export function ReclamationsUIProvider({reclamationsUIEvents, children}) {
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

  const initReclamation = {
    _id: undefined,
    username: "",
    referCode: "",
    rapportName:"",
    device: "",
    geo: "",
    ipSignup: "",
    points: 0,
    createdAt: "",
    isActive: "",
    provision: 0,
    isVerified: 1
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initReclamation,
    openUpdateReclamationsStatusDialog: reclamationsUIEvents.openUpdateReclamationsStatusDialog,
    openFetchReclamationsDetailsDialog: reclamationsUIEvents.openFetchReclamationsDetailsDialog
  };

  return <ReclamationsUIContext.Provider value={value}>{children}</ReclamationsUIContext.Provider>;
}