import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ReservationsUIHelpers";

const ReservationsUIContext = createContext();

export function useReservationsUIContext() {
  return useContext(ReservationsUIContext);
}

export const ReservationsUIConsumer = ReservationsUIContext.Consumer;

export function ReservationsUIProvider({reservationsUIEvents, children}) {
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

  const initReservation = {
    _id: undefined,
    username: "",
    referCode: "",
    reservationName:"",
    device: "",
    geo: "",
    ipSignup: "",
    points: 0,
    createdAt: "",
    isActive: "",
    provision: 0,
    isVerfied: 1
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initReservation,
    newReservationButtonClick: reservationsUIEvents.newReservationButtonClick,
    openEditReservationDialog: reservationsUIEvents.openEditReservationDialog,
    openDeleteReservationDialog: reservationsUIEvents.openDeleteReservationDialog,
    openDeleteReservationsDialog: reservationsUIEvents.openDeleteReservationsDialog,
    openFetchReservationsDialog: reservationsUIEvents.openFetchReservationsDialog,
    openUpdateReservationsStatusDialog: reservationsUIEvents.openUpdateReservationsStatusDialog,
    openFetchReservationsDetailsDialog: reservationsUIEvents.openFetchReservationsDetailsDialog
  };

  return <ReservationsUIContext.Provider value={value}>{children}</ReservationsUIContext.Provider>;
}