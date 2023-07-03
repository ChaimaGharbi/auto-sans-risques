import React from "react";
import { Route } from "react-router-dom";
import { AssistancesLoadingDialog } from "./assistances-loading-dialog/AssistancesLoadingDialog";
import { AssistancesUIProvider } from "./AssistancesUIContext";
import { AssistancesCard } from "./AssistancesCard";
import { AssistancesUpdateStateDialog } from "./assistances-update-status-dialog/AssistancesUpdateStateDialog";

export function AssistancesPage({ history }) {
  const assistancesUIEvents = {
    openFetchAssistancesDialog: () => {
      history.push(`/dash/assistances/fetch`);
    },
    openUpdateAssistancesStatusDialog: () => {
      history.push("/dash/assistances/updateStatus");
    },
    
  }

  return (
    <AssistancesUIProvider assistancesUIEvents={assistancesUIEvents}>
      <AssistancesLoadingDialog />
      
      <Route path="/dash/assistances/updateStatus">
        {({ history, match }) => (
          <AssistancesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/assistances");
            }}
          />
        )}
      </Route>
      <AssistancesCard />
    </AssistancesUIProvider>
  );
}
