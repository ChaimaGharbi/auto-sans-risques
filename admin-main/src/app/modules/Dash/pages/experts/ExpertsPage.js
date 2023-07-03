import React from "react";
import { Route } from "react-router-dom";
import { ExpertsLoadingDialog } from "./experts-loading-dialog/ExpertsLoadingDialog";
import { ExpertEditDialog } from "./expert-edit-dialog/ExpertEditDialog";
import { ExpertsFetchDialog } from "./experts-fetch-dialog/ExpertsFetchDialog";
import { ExpertsUpdateStateDialog } from "./experts-update-status-dialog/ExpertsUpdateStateDialog";
import { ExpertsUIProvider } from "./ExpertsUIContext";
import { ExpertsCard } from "./ExpertsCard";
import { ExpertFetchDetails } from "./expert-fetch-details/ExpertFetchDetails";

export function ExpertsPage({ history }) {
  const expertsUIEvents = {
    openEditExpertDialog: (_id) => {
      history.push(`/dash/experts/${_id}/edit`);
    },
    openFetchExpertsDialog: () => {
      history.push(`/dash/experts/fetch`);
    },
    openUpdateExpertsStatusDialog: () => {
      history.push("/dash/experts/updateStatus");
    },
    openFetchExpertDetailsDialog: (id) => {
      history.push(`/dash/experts/${id}/details`);
    },
  };

  return (
    <ExpertsUIProvider expertsUIEvents={expertsUIEvents}>
      <ExpertsLoadingDialog />
      <Route path="/dash/experts/:_id/edit">
        {({ history, match }) => (
          <ExpertEditDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/experts");
            }}
          />
        )}
      </Route>
      <Route path="/dash/experts/fetch">
        {({ history, match }) => (
          <ExpertsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/experts");
            }}
          />
        )}
      </Route>
      <Route path="/dash/experts/updateStatus">
        {({ history, match }) => (
          <ExpertsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/experts");
            }}
          />
        )}
      </Route>
      <Route path="/dash/experts/:_id/details">
        {({ history, match }) => (
          <ExpertFetchDetails
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/experts");
            }}
          />
        )}
      </Route>
      <ExpertsCard />
    </ExpertsUIProvider>
  );
}
