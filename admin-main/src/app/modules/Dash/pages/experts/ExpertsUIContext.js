import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ExpertsUIHelpers";

const ExpertsUIContext = createContext();

export function useExpertsUIContext() {
  return useContext(ExpertsUIContext);
}

export const ExpertsUIConsumer = ExpertsUIContext.Consumer;

export function ExpertsUIProvider({ expertsUIEvents, children }) {
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

  const initExpert = {
    _id: undefined,
    email: "",
    fullName: "",
    adresse: "",
    tel: "",
    specialite: "",
    nb_missions: 0,
    createdAt: "",
    isActive: "",
    isVerified: 1,
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initExpert,
    newExpertButtonClick: expertsUIEvents.newExpertButtonClick,
    openEditExpertDialog: expertsUIEvents.openEditExpertDialog,
    openDeleteExpertDialog: expertsUIEvents.openDeleteExpertDialog,
    openDeleteExpertsDialog: expertsUIEvents.openDeleteExpertsDialog,
    openFetchExpertsDialog: expertsUIEvents.openFetchExpertsDialog,
    openUpdateExpertsStatusDialog:
      expertsUIEvents.openUpdateExpertsStatusDialog,
    openFetchExpertDetailsDialog: expertsUIEvents.openFetchExpertDetailsDialog,
  };

  return (
    <ExpertsUIContext.Provider value={value}>
      {children}
    </ExpertsUIContext.Provider>
  );
}
