import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./PacksUIHelpers";

const PacksUIContext = createContext();

export function usePacksUIContext() {
  return useContext(PacksUIContext);
}

export const PacksUIConsumer = PacksUIContext.Consumer;

export function PacksUIProvider({packsUIEvents, children}) {
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

  const initPack = {
    _id: undefined,
    nb_missions: "",
    prix: "",
    priority: "",

  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initPack,
    newPackButtonClick: packsUIEvents.newPackButtonClick,
    openEditPackDialog: packsUIEvents.openEditPackDialog,
    openDeletePackDialog: packsUIEvents.openDeletePackDialog,
    openDeletePacksDialog: packsUIEvents.openDeletePacksDialog,
    openFetchPacksDialog: packsUIEvents.openFetchPacksDialog,
    openUpdatePacksStatusDialog: packsUIEvents.openUpdatePacksStatusDialog,
    openFetchPacksDetailsDialog: packsUIEvents.openFetchPacksDetailsDialog
  };

  return <PacksUIContext.Provider value={value}>{children}</PacksUIContext.Provider>;
}