import React from "react";
import { Route } from "react-router-dom";
import { ReservationsLoadingDialog } from "./reservations-loading-dialog/ReservationsLoadingDialog";
import { ReservationsUIProvider } from "./ReservationsContext";
import { ReservationsCard } from "./ReservationsCard";
import { ReservationsUpdateStateDialog } from "./reservations-update-status-dialog/ReservationsUpdateStateDialog";

export function ReservationsPage({ history }) {
  const reservationsUIEvents = {
    openFetchReservationsDialog: () => {
      history.push(`/dash/reservations/fetch`);
    },
    openUpdateReservationsStatusDialog: () => {
      history.push("/dash/reservations/updateStatus");
    },
    
  }

  return (
    <ReservationsUIProvider reservationsUIEvents={reservationsUIEvents}>
      <ReservationsLoadingDialog />
      
      <Route path="/dash/reservations/updateStatus">
        {({ history, match }) => (
          <ReservationsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/reservations");
            }}
          />
        )}
      </Route>
      <ReservationsCard />
    </ReservationsUIProvider>
  );
}
