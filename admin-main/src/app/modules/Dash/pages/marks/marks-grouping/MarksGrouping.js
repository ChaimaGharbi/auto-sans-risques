import React, { useMemo } from "react";
import { useCategoriesUIContext } from "../MarksUIContext";

export function CategoriesGrouping() {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      setIds: categoriesUIContext.setIds,
      opendeleteMarksDialog: categoriesUIContext.opendeleteMarksDialog,
      openfetchMarksDialog: categoriesUIContext.openfetchMarksDialog,
      openUpdateCategoriesStatusDialog:
        categoriesUIContext.openUpdateCategoriesStatusDialog,
    };
  }, [categoriesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{categoriesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-danger font-weight-bolder font-size-sm"
                onClick={categoriesUIProps.opendeleteMarksDialog}
              >
                <i className="fa fa-trash"></i> Tout supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
