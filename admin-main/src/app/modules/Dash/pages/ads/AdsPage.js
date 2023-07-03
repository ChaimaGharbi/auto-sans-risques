import React from "react";
import { Route } from "react-router-dom";
import { AdsLoadingDialog } from "./ads-loading-dialog/AdsLoadingDialog";
import { AdEditDialog } from "./ad-edit-dialog/AdEditDialog";
import { AdsFetchDialog } from "./ads-fetch-dialog/AdsFetchDialog";
import { AdDeleteDialog } from "./ad-delete-dialog/AdDeleteDialog";
import { AdsUIProvider } from "./AdsUIContext";
import { AdsCard } from "./AdsCard";
import { AdsDeleteDialog } from "./ads-delete-dialog/AdsDeleteDialog";

export function AdsPage({ history }) {
  const packsUIEvents = {
    newAdButtonClick: () => {
      history.push("/dash/ads/new");
    },
    openEditAdDialog: (_id) => {
      history.push(`/dash/ads/${_id}/edit`);
    },
    openDeleteAdDialog: (_id) => {
      history.push(`/dash/ads/${_id}/cancel`);
    },
    openDeleteAdsDialog: () => {
      history.push(`/dash/ads/deleteAds`);
    },
  };

  return (
    <AdsUIProvider packsUIEvents={packsUIEvents}>
      <AdsLoadingDialog />
      <Route path="/dash/ads/new">
        {({ history, match }) => (
          <AdEditDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/ads");
            }}
          />
        )}
      </Route>
      <Route path="/dash/ads/:_id/edit">
        {({ history, match }) => (
          <AdEditDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/ads");
            }}
          />
        )}
      </Route>
      <Route path="/dash/ads/:_id/cancel">
        {({ history, match }) => (
          <AdDeleteDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/ads");
            }}
          />
        )}
      </Route>
      <Route path="/dash/ads/fetch">
        {({ history, match }) => (
          <AdsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/ads");
            }}
          />
        )}
      </Route>
      <Route path="/dash/ads/deleteAds">
        {({ history, match }) => (
          <AdsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/ads");
            }}
          />
        )}
      </Route>
      <AdsCard />
    </AdsUIProvider>
  );
}
