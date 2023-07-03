import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ClientsUIHelpers";

const ClientsUIContext = createContext();

export function useClientsUIContext() {
  return useContext(ClientsUIContext);
}

export const ClientsUIConsumer = ClientsUIContext.Consumer;

export function ClientsUIProvider({clientsUIEvents, children}) {
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

  const initClient = {
    _id: undefined,
    email: "",
    fullName: "",
    adresse: "",
    tel: "",
    specialite: "",
    nb_missions: 0,
    createdAt: "",
    isActive: "",
    isVerfied: 1
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initClient,
    newClientButtonClick: clientsUIEvents.newClientButtonClick,
    openEditClientDialog: clientsUIEvents.openEditClientDialog,
    openDeleteClientDialog: clientsUIEvents.openDeleteClientDialog,
    openDeleteClientsDialog: clientsUIEvents.openDeleteClientsDialog,
    openFetchClientsDialog: clientsUIEvents.openFetchClientsDialog,
    openUpdateClientsStatusDialog: clientsUIEvents.openUpdateClientsStatusDialog,
    openFetchClientsDetailsDialog: clientsUIEvents.openFetchClientsDetailsDialog
  };

  return <ClientsUIContext.Provider value={value}>{children}</ClientsUIContext.Provider>;
}