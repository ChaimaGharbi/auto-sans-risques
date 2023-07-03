import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ModeratorsUIHelpers";

const ModeratorsUIContext = createContext();

export function useModeratorsUIContext() {
  return useContext(ModeratorsUIContext);
}

export const PacksUIConsumer = ModeratorsUIContext.Consumer;

export function ModeratorsUIProvider({ moderatorsUIEvents, children }) {
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

  const initModerator = {
    _id: undefined,
    fullName: "",
    tel: "",
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initModerator,
    newModeratorButtonClick: moderatorsUIEvents.newModeratorButtonClick,
    openEditModeratorDialog: moderatorsUIEvents.openEditModeratorDialog,
    openDeleteModeratorDialog: moderatorsUIEvents.openDeleteModeratorDialog,
    openDeleteModeratorsDialog: moderatorsUIEvents.openDeleteModeratorsDialog,
    openFetchModeratorsDialog: moderatorsUIEvents.openFetchModeratorsDialog,
    openUpdateModeratorsStatusDialog:
      moderatorsUIEvents.openUpdateModeratorsStatusDialog,
    openFetchModeratorsDetailsDialog:
      moderatorsUIEvents.openFetchModeratorsDetailsDialog,
  };

  return (
    <ModeratorsUIContext.Provider value={value}>
      {children}
    </ModeratorsUIContext.Provider>
  );
}
