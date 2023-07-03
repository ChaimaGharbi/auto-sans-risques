import React from "react";
import { Route } from "react-router-dom";
import { CategoriesLoadingDialog } from "./categories-loading-dialog/CategoriesLoadingDialog";
import { CategoryEditDialog } from "./category-edit-dialog/CategoryEditDialog";
import { CategoryDeleteDialog } from "./category-delete-dialog/CategoryDeleteDialog";
import { CategoriesDeleteDialog } from "./categories-delete-dialog/CategoriesDeleteDialog";
import { CategoriesFetchDialog } from "./categories-fetch-dialog/CategoriesFetchDialog";
import { CategoriesUIProvider } from "./CategoriesUIContext";
import { CategoriesCard } from "./CategoriesCard";

export function CategoriesPage({ history }) {
  const categoriesUIEvents = {
    newCategoryButtonClick: () => {
      history.push("/dash/articles/categories/new");
    },
    openEditCategoryDialog: (_id) => {
      history.push(`/dash/articles/categories/${_id}/edit`);
    },
    openFetchCategoriesDialog: () => {
      history.push(`/dash/articles/categories/fetch`);
    },
    openDeleteCategoryDialog: (_id) => {
      history.push(`/dash/articles/categories/${_id}/cancel`);
    },
    openDeleteCategoriesDialog: () => {
      history.push(`/dash/articles/categories/deleteCategories`);
    },
    openAddArticlesToCategoryDialog: (_id) => {
      history.push(`/dash/categories/${_id}/add`);
    },
  };

  return (
    <CategoriesUIProvider categoriesUIEvents={categoriesUIEvents}>
      <CategoriesLoadingDialog />
      <Route path="/dash/articles/categories/new">
        {({ history, match }) => (
          <CategoryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/articles/categories");
            }}
          />
        )}
      </Route>
      <Route path="/dash/articles/categories/:_id/edit">
        {({ history, match }) => (
          <CategoryEditDialog
            show={match != null}
            id={match && match.params?._id}
            onHide={() => {
              history.push("/dash/articles/categories");
            }}
          />
        )}
      </Route>
      <Route path="/dash/articles/categories/:_id/cancel">
        {({ history, match }) => (
          <CategoryDeleteDialog
            show={match != null}
            id={match && match.params?._id}
            onHide={() => {
              history.push("/dash/articles/categories");
            }}
          />
        )}
      </Route>
      <Route path="/dash/articles/categories/fetch">
        {({ history, match }) => (
          <CategoriesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/articles/categories");
            }}
          />
        )}
      </Route>
      <Route path="/dash/articles/categories/deleteCategories">
        {({ history, match }) => (
          <CategoriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/dash/articles/categories");
            }}
          />
        )}
      </Route>
      <CategoriesCard />
    </CategoriesUIProvider>
  );
}
