import React from "react";
import { Route } from "react-router-dom";
import { ModeratorsLoadingDialog } from "./moderators-loading-dialog/ModeratorsLoadingDialog";
import { ModeratorEditDialog } from "./moderator-edit-dialog/ModeratorEditDialog";
import { ModeratorsFetchDialog } from "./moderators-fetch-dialog/ModeratorsFetchDialog";
import { ModeratorDeleteDialog } from "./moderator-delete-dialog/ModeratorDeleteDialog";
import { ModeratorsUIProvider } from "./ModeratorsUIContext";

import { ModeratorsCard } from "./ModeratorsCard";
import { ModeratorsDeleteDialog } from "./moderators-delete-dialog/ModeratorsDeleteDialog";

export function ModeratorsPage({ history }) {
  const moderatorsUIEvents = {
    newModeratorButtonClick: () => {
      history.push("/dash/moderators/new");
    },
    openEditModeratorDialog: (_id) => {
      history.push(`/dash/moderators/${_id}/edit`);
    },
    openDeleteModeratorDialog: (_id) => {
      history.push(`/dash/moderators/${_id}/cancel`);
    },
    openDeleteModeratorsDialog: () => {
      history.push(`/dash/moderators/deleteModerators`);
    },
  };

  return (
    <ModeratorsUIProvider moderatorsUIEvents={moderatorsUIEvents}>
      <ModeratorsLoadingDialog />
      <Route path="/dash/moderators/new">
        {({ history, match }) => (
          <ModeratorEditDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/moderators");
            }}
          />
        )}
      </Route>
      <Route path="/dash/moderators/:_id/edit">
        {({ history, match }) => (
          <ModeratorEditDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/moderators");
            }}
          />
        )}
      </Route>
      <Route path="/dash/moderators/:_id/cancel">
        {({ history, match }) => (
          <ModeratorDeleteDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/moderators");
            }}
          />
        )}
      </Route>
      <Route path="/dash/moderators/fetch">
        {({ history, match }) => (
          <ModeratorsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/moderators");
            }}
          />
        )}
      </Route>
      <Route path="/dash/moderators/deleteModerators">
        {({ history, match }) => (
          <ModeratorsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/moderators");
            }}
          />
        )}
      </Route>
      <ModeratorsCard />
    </ModeratorsUIProvider>
  );
}
