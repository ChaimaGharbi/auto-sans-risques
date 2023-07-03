import React, { useMemo } from "react";
import { useArticlesUIContext } from "./ArticlesUIContext";

export function ArticlesGrouping() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return {
      ids: articlesUIContext.ids,
      openDeleteArticlesDialog: articlesUIContext.openDeleteArticlesDialog,
      openFetchArticlesDialog: articlesUIContext.openFetchArticlesDialog,
    };
  }, [articlesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger mt-5">
                <span>Les enregistrements sélectionnés comptent: {articlesUIProps.ids.length}</span>
              </label>
            </div>
            <div className="form-group-inline">
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={articlesUIProps.openDeleteArticlesDialog}
              >
                <i className="fa fa-trash"></i> Tout supprimer
              </button>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
