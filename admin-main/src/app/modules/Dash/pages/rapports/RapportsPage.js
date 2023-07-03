import React from "react";
import { Route } from "react-router-dom";
import { RapportsLoadingDialog } from "./rapports-loading-dialog/RapportsLoadingDialog";
import { RapportsUIProvider } from "./RapportsUIContext";
import { RapportsCard } from "./RapportsCard";
import { RapportsUpdateStateDialog } from "./rapports-update-status-dialog/RapportsUpdateStateDialog";

export function RapportsPage({ history }) {
  const rapportsUIEvents = {
    openFetchRapportsDialog: () => {
      history.push(`/dash/rapports/fetch`);
    },
    openUpdateRapportsStatusDialog: () => {
      history.push("/dash/rapports/updateStatus");
    },
    
  }

  return (
    <RapportsUIProvider rapportsUIEvents={rapportsUIEvents}>
      <RapportsLoadingDialog />
      
      <Route path="/dash/rapports/updateStatus">
        {({ history, match }) => (
          <RapportsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/rapports");
            }}
          />
        )}
      </Route>
      <RapportsCard />
    </RapportsUIProvider>
  );
}
