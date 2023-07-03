import React from "react";
import { Route } from "react-router-dom";
import { CategoriesLoadingDialog } from "./marks-loading-dialog/MarksLoadingDialog";
import { CategoryEditDialog } from "./mark-edit-dialog/MarkEditDialog";
import { CategoryDeleteDialog } from "./mark-delete-dialog/MarkDeleteDialog";
import { CategoriesDeleteDialog } from "./marks-delete-dialog/MarksDeleteDialog";
import { CategoriesFetchDialog } from "./marks-fetch-dialog/MarksFetchDialog";
import { CategoriesUIProvider } from "./MarksUIContext";
import { CategoriesCard } from "./MarksCard";

export function MarksPage({ history }) {
  const categoriesUIEvents = {
    newCategoryButtonClick: () => {
      history.push("/dash/marques/marks/new");
    },
    openEditCategoryDialog: (_id) => {
      history.push(`/dash/marques/marks/${_id}/edit`);
    },
    openfetchMarksDialog: () => {
      history.push(`/dash/marques/marks/fetch`);
    },
    opendeleteMarkDialog: (_id) => {
      history.push(`/dash/marques/marks/${_id}/cancel`);
    },
    opendeleteMarksDialog: () => {
      history.push(`/dash/marques/marks/deleteMarks`);
    },
    openAddArticlesToCategoryDialog: (_id) => {
      history.push(`/dash/marks/${_id}/add`);
    },
  };

  return (
    <CategoriesUIProvider categoriesUIEvents={categoriesUIEvents}>
      <CategoriesLoadingDialog />
      <Route path="/dash/marques/marks/new">
        {({ history, match }) => (
          <CategoryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/marques/marks");
            }}
          />
        )}
      </Route>
      <Route path="/dash/marques/marks/:_id/edit">
        {({ history, match }) => (
          <CategoryEditDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/marques/marks");
            }}
          />
        )}
      </Route>
      <Route path="/dash/marques/marks/:_id/cancel">
        {({ history, match }) => (
          <CategoryDeleteDialog
            show={match != null}
            id={match && match.params._id}
            onHide={() => {
              history.push("/dash/marques/marks");
            }}
          />
        )}
      </Route>
      <Route path="/dash/marques/marks/fetch">
        {({ history, match }) => (
          <CategoriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/marques/marks");
            }}
          />
        )}
      </Route>
      <Route path="/dash/marques/marks/deleteMarks">
        {({ history, match }) => (
          <CategoriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/marques/marks");
            }}
          />
        )}
      </Route>
      <CategoriesCard />
    </CategoriesUIProvider>
  );
}
