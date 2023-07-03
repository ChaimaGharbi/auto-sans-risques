import React from "react";
import { Route } from "react-router-dom";
import { PacksLoadingDialog } from "./packs-loading-dialog/PacksLoadingDialog";
import { PackEditDialog } from "./pack-edit-dialog/PackEditDialog";
import { PacksFetchDialog } from "./packs-fetch-dialog/PacksFetchDialog";
import { PackDeleteDialog } from "./pack-delete-dialog/PackDeleteDialog";
import { PacksUIProvider } from "./PacksUIContext";
import { PacksCard } from "./PacksCard";
import { PacksDeleteDialog } from "./packs-delete-dialog/PacksDeleteDialog";

export function PacksPage({ history }) {
  const packsUIEvents = {
    newPackButtonClick: () => {
      history.push("/dash/packs/new");
    },
    openEditPackDialog: (_id) => {
      history.push(`/dash/packs/${_id}/edit`);
    },
    openDeletePackDialog: (_id) => {
      history.push(`/dash/packs/${_id}/cancel`);
    },
    openDeletePacksDialog: () => {
      history.push(`/dash/packs/deletePacks`);
    },
  }

  return (
    <PacksUIProvider packsUIEvents={packsUIEvents}>
      <PacksLoadingDialog />
      <Route path="/dash/packs/new">
        {({ history, match }) => (
          <PackEditDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/packs");
            }}
          />
        )}
        </Route>
      <Route path="/dash/packs/:_id/edit">
        {({ history, match }) => (
          <PackEditDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {

              history.push("/dash/packs");
            }}
          />
        )}
      </Route>
      <Route path="/dash/packs/:_id/cancel">
        {({ history, match }) => (
          <PackDeleteDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/packs");
            }}
          />
        )}
      </Route>
      <Route path="/dash/packs/fetch">
        {({ history, match }) => (
          <PacksFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/packs");
            }}
          />
        )}
      </Route>
      <Route path="/dash/packs/deletePacks">
        {({ history, match }) => (
          <PacksDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/packs");
            }}
          />
        )}
      </Route>
      <PacksCard />
    </PacksUIProvider>
  );
}
