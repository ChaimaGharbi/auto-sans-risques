import React from "react";
import { Route } from "react-router-dom";
import { ClientsLoadingDialog } from "./clients-loading-dialog/ClientsLoadingDialog";
import { ClientEditDialog } from "./client-edit-dialog/ClientEditDialog";
import { ClientsFetchDialog } from "./clients-fetch-dialog/ClientsFetchDialog";
import { ClientsUpdateStateDialog } from "./clients-update-status-dialog/ClientsUpdateStateDialog";
import { ClientsUIProvider } from "./ClientsUIContext";
import { ClientsCard } from "./ClientsCard";

export function ClientsPage({ history }) {
  const clientsUIEvents = {
    openEditClientDialog: (_id) => {
      history.push(`/dash/clients/${_id}/edit`);
    },
    openFetchClientsDialog: () => {
      history.push(`/dash/clients/fetch`);
    },
    openUpdateClientsStatusDialog: () => {
      history.push("/dash/clients/updateStatus");
    }
  }

  return (
    <ClientsUIProvider clientsUIEvents={clientsUIEvents}>
      <ClientsLoadingDialog />
      <Route path="/dash/clients/:_id/edit">
        {({ history, match }) => (
          <ClientEditDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {

              history.push("/dash/clients");
            }}
          />
        )}
      </Route>
      <Route path="/dash/clients/fetch">
        {({ history, match }) => (
          <ClientsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/clients");
            }}
          />
        )}
      </Route>
      <Route path="/dash/clients/updateStatus">
        {({ history, match }) => (
          <ClientsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/clients");
            }}
          />
        )}
      </Route>
      <ClientsCard />
    </ClientsUIProvider>
  );
}
