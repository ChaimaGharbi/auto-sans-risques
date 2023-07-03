import React from "react";
import { Route } from "react-router-dom";
import { AvisLoadingDialog } from "./avis-loading-dialog/AvisLoadingDialog";
import { AvisUIProvider } from "./AvisUIContext";
import { AvisCard } from "./AvisCard";
import { AvisFetchDetails } from "./avis-fetch-details/AvisFetchDetails";
import { AvisDeleteDialog } from "./avis-delete-dialog/AvisDeleteDialog";
import { AvissDeleteDialog } from "./aviss-delete-dialog/AvissDeleteDialog";

export function AvisPage({ history }) {
  const avisUIEvents = {
    openFetchAvisDetailsDialog: (id) => {
      history.push(`/dash/avis/${id}/details`);
    },
    openDeleteAvisDialog: (_id) => {
      history.push(`/dash/avis/${_id}/cancel`);
    },
    openDeleteAvissDialog: () => {
      history.push(`/dash/avis/deleteAvis`);
    },
    
  }

  return (
    <AvisUIProvider avisUIEvents={avisUIEvents}>
      <AvisLoadingDialog />
      <Route path="/dash/avis/:_id/details">
        {({ history, match }) => (
          <AvisFetchDetails
            show={match != null}
            id={match && match.params._id}
            onHide={() => {

              history.push("/dash/avis");
            }}
          />
        )}
      </Route>
      <Route path="/dash/avis/:_id/cancel">
        {({ history, match }) => (
          <AvisDeleteDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/avis");
            }}
          />
        )}
      </Route>
      <Route path="/dash/avis/deleteAvis">
        {({ history, match }) => (
          <AvissDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/avis");
            }}
          />
        )}
      </Route>

      <AvisCard />
    </AvisUIProvider>
  );
}
