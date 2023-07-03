import React from "react";
import { Route } from "react-router-dom";
import { ReclamationsLoadingDialog } from "./reclamations-loading-dialog/ReclamationsLoadingDialog";
import { ReclamationsUIProvider } from "./ReclamationsUIContext";
import { ReclamationsCard } from "./ReclamationsCard";
import { ReclamationsUpdateStateDialog } from "./reclamations-update-status-dialog/ReclamationsUpdateStateDialog";
import { ReclamationFetchDetails } from "./reclamation-fetch-details/ReclamationFetchDetails";

export function ReclamationsPage({ history }) {
  const reclamationsUIEvents = {
    openFetchReclamationsDetailsDialog: (id) => {
      history.push(`/dash/reclamations/${id}/details`);
    },
    openUpdateReclamationsStatusDialog: () => {
      history.push("/dash/reclamations/updateStatus");
    },
    
  }

  return (
    <ReclamationsUIProvider reclamationsUIEvents={reclamationsUIEvents}>
      <ReclamationsLoadingDialog />
      <Route path="/dash/reclamations/:_id/details">
        {({ history, match }) => (
          <ReclamationFetchDetails
            show={match != null}
            id={match && match.params._id}
            onHide={() => {

              history.push("/dash/reclamations");
            }}
          />
        )}
      </Route>
      <Route path="/dash/reclamations/updateStatus">
        {({ history, match }) => (
          <ReclamationsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/reclamations");
            }}
          />
        )}
      </Route>
      <ReclamationsCard />
    </ReclamationsUIProvider>
  );
}
