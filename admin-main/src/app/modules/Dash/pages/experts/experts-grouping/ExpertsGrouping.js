import React, { useMemo } from "react";
import { useExpertsUIContext } from "../ExpertsUIContext";

export function ExpertsGrouping() {
  // Experts UI Context
  const expertsUIContext = useExpertsUIContext();
  const expertsUIProps = useMemo(() => {
    return {
      ids: expertsUIContext.ids,
      setIds: expertsUIContext.setIds,
      openDeleteExpertsDialog: expertsUIContext.openDeleteExpertsDialog,
      openFetchExpertsDialog: expertsUIContext.openFetchExpertsDialog,
      openUpdateExpertsStatusDialog:
        expertsUIContext.openUpdateExpertsStatusDialog,
    };
  }, [expertsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{expertsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={expertsUIProps.openUpdateExpertsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
