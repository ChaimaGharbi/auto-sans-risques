import React from "react";
import { Route } from "react-router-dom";
import { RapportcategoriesLoadingDialog } from "./rapportcategories-loading-dialog/RapportcategoriesLoadingDialog";
import { RapportcategoryEditDialog } from "./rapportcategory-edit-dialog/RapportcategoryEditDialog";
import { RapportcategoryDeleteDialog } from "./rapportcategory-delete-dialog/RapportcategoryDeleteDialog";
import { RapportcategoriesDeleteDialog } from "./rapportcategories-delete-dialog/RapportcategoriesDeleteDialog";
import { RapportcategoriesFetchDialog } from "./rapportcategories-fetch-dialog/RapportcategoriesFetchDialog";
import { RapportcategoriesUIProvider } from "./RapportcategoriesUIContext";
import { RapportcategoriesCard } from "./RapportcategoriesCard";

export function RapportcategoriesPage({ history }) {
  const rapportcategoriesUIEvents = {
    newRapportcategoryButtonClick: () => {
      history.push("/dash/questions/rapportcategories/new");
    },
    openEditRapportcategoryDialog: (_id) => {
      history.push(`/dash/questions/rapportcategories/${_id}/edit`);
    },
    openFetchRapportcategoriesDialog: () => {
      history.push(`/dash/questions/rapportcategories/fetch`);
    },
    openDeleteRapportcategoryDialog:  (_id) => {
      history.push(`/dash/questions/rapportcategories/${_id}/cancel`);
    },
    openDeleteRapportcategoriesDialog: () => {
      history.push(`/dash/questions/rapportcategories/deleteRapportcategories`);
    },
    openAddQuestionsToRapportcategoryDialog: (_id) => {
      history.push(`/dash/questionsrapport/categories/${_id}/add`);
    }
  }

  return (
    <RapportcategoriesUIProvider rapportcategoriesUIEvents={rapportcategoriesUIEvents}>
      <RapportcategoriesLoadingDialog />
      <Route path="/dash/questions/rapportcategories/new">
        {({ history, match }) => (
          <RapportcategoryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/questions/rapportcategories");
            }}
          />
        )}
        </Route>
        <Route path="/dash/questions/rapportcategories/:_id/edit">
        {({ history, match }) => (
          <RapportcategoryEditDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/questions/rapportcategories");
            }}
          />
        )}
        </Route>
      <Route path="/dash/questions/rapportcategories/:_id/cancel">
        {({ history, match }) => (
          <RapportcategoryDeleteDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/questions/rapportcategories");
            }}
          />
        )}
      </Route>
      <Route path="/dash/questions/rapportcategories/fetch">
        {({ history, match }) => (
          <RapportcategoriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/questions/rapportcategories");
            }}
          />
        )}
      </Route>
      <Route path="/dash/questions/rapportcategories/deleteRapportcategories">
        {({ history, match }) => (
          <RapportcategoriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/questions/rapportcategories");
            }}
          />
        )}
      </Route>
      <RapportcategoriesCard />
    </RapportcategoriesUIProvider>
  );
}
