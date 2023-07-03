import React, { useMemo } from "react";
import { useAvisUIContext } from "../AvisUIContext";

export function AvisGrouping() {
  // Avis UI Context
  const avisUIContext = useAvisUIContext();
  const avisUIProps = useMemo(() => {
    return {
      ids: avisUIContext.ids,
      setIds: avisUIContext.setIds,
      openDeleteAvisDialog: avisUIContext.openDeleteAvisDialog,
      openFetchAvisDialog: avisUIContext.openFetchAvisDialog,
      openDeleteAvissDialog:
        avisUIContext.openDeleteAvissDialog,
    };
  }, [avisUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                Les enregistrements sélectionnés comptent: <b>{avisUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-danger font-weight-bolder font-size-sm"
                onClick={avisUIProps.openDeleteAvissDialog}
              >
                <i className="fa fa-sync-alt"></i> Supprimer tout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
