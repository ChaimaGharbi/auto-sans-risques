import React, { useMemo } from "react";
import { useReclamationsUIContext } from "../ReclamationsUIContext";

export function ReclamationsGrouping() {
  // Reclamations UI Context
  const reclamationsUIContext = useReclamationsUIContext();
  const reclamationsUIProps = useMemo(() => {
    return {
      ids: reclamationsUIContext.ids,
      setIds: reclamationsUIContext.setIds,
      openDeleteReclamationsDialog: reclamationsUIContext.openDeleteReclamationsDialog,
      openFetchReclamationsDialog: reclamationsUIContext.openFetchReclamationsDialog,
      openUpdateReclamationsStatusDialog:
        reclamationsUIContext.openUpdateReclamationsStatusDialog,
    };
  }, [reclamationsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                Les enregistrements sélectionnés comptent: <b>{reclamationsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={reclamationsUIProps.openUpdateReclamationsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Modifier Etat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
