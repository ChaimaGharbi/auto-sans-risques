import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./RapportsUIHelpers";

const RapportsUIContext = createContext();

export function useRapportsUIContext() {
  return useContext(RapportsUIContext);
}

export const RapportsUIConsumer = RapportsUIContext.Consumer;

export function RapportsUIProvider({rapportsUIEvents, children}) {
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

  const initRapport = {
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
    initRapport,
    newRapportButtonClick: rapportsUIEvents.newRapportButtonClick,
    openEditRapportDialog: rapportsUIEvents.openEditRapportDialog,
    openDeleteRapportDialog: rapportsUIEvents.openDeleteRapportDialog,
    openDeleteRapportsDialog: rapportsUIEvents.openDeleteRapportsDialog,
    openFetchRapportsDialog: rapportsUIEvents.openFetchRapportsDialog,
    openUpdateRapportsStatusDialog: rapportsUIEvents.openUpdateRapportsStatusDialog,
    openFetchRapportsDetailsDialog: rapportsUIEvents.openFetchRapportsDetailsDialog
  };

  return <RapportsUIContext.Provider value={value}>{children}</RapportsUIContext.Provider>;
}