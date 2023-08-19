import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./AssistancesUIHelpers";

const AssistancesUIContext = createContext();

export function useAssistancesUIContext() {
  return useContext(AssistancesUIContext);
}

export const AssistancesUIConsumer = AssistancesUIContext.Consumer;

export function AssistancesUIProvider({assistancesUIEvents, children}) {
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

  const initAssistance = {
    _id: undefined,
    username: "",
    referCode: "",
    assistanceName:"",
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
    initAssistance,
    newAssistanceButtonClick: assistancesUIEvents.newAssistanceButtonClick,
    openEditAssistanceDialog: assistancesUIEvents.openEditAssistanceDialog,
    openDeleteAssistanceDialog: assistancesUIEvents.openDeleteAssistanceDialog,
    openDeleteAssistancesDialog: assistancesUIEvents.openDeleteAssistancesDialog,
    openFetchAssistancesDialog: assistancesUIEvents.openFetchAssistancesDialog,
    openUpdateAssistancesStatusDialog: assistancesUIEvents.openUpdateAssistancesStatusDialog,
    openFetchAssistancesDetailsDialog: assistancesUIEvents.openFetchAssistancesDetailsDialog
  };

  return <AssistancesUIContext.Provider value={value}>{children}</AssistancesUIContext.Provider>;
}