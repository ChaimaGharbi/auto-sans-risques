import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./AvisUIHelpers";

const AvisUIContext = createContext();

export function useAvisUIContext() {
  return useContext(AvisUIContext);
}

export const AvisUIConsumer = AvisUIContext.Consumer;

export function AvisUIProvider({avisUIEvents, children}) {
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

  const initAvis = {
    _id: undefined,
    note: "",
    referCode: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initAvis,
    openFetchAvisDetailsDialog: avisUIEvents.openFetchAvisDetailsDialog,
    openDeleteAvisDialog: avisUIEvents.openDeleteAvisDialog,
    openDeleteAvissDialog: avisUIEvents.openDeleteAvissDialog

  };

  return <AvisUIContext.Provider value={value}>{children}</AvisUIContext.Provider>;
}