import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AdsUIHelpers";

const adsUIContext = createContext();

export function useAdsUIContext() {
  return useContext(adsUIContext);
}

export const PacksUIConsumer = adsUIContext.Consumer;

export function AdsUIProvider({ packsUIEvents, children }) {
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

  const initPack = {
    _id: undefined,
    title: "",
    body: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initPack,
    newAdButtonClick: packsUIEvents.newAdButtonClick,
    openEditAdDialog: packsUIEvents.openEditAdDialog,
    openDeleteAdDialog: packsUIEvents.openDeleteAdDialog,
    openDeleteAdsDialog: packsUIEvents.openDeleteAdsDialog,
    openFetchAdsDialog: packsUIEvents.openFetchAdsDialog,
    openUpdateAdsStatusDialog: packsUIEvents.openUpdateAdsStatusDialog,
    openFetchAdsDetailsDialog: packsUIEvents.openFetchAdsDetailsDialog,
  };

  return (
    <adsUIContext.Provider value={value}>{children}</adsUIContext.Provider>
  );
}
