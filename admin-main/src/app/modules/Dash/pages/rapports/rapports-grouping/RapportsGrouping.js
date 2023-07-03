import React, { useMemo } from "react";
import { useRapportsUIContext } from "../RapportsUIContext";

export function RapportsGrouping() {
  // Rapports UI Context
  const rapportsUIContext = useRapportsUIContext();
  const rapportsUIProps = useMemo(() => {
    return {
      ids: rapportsUIContext.ids,
      setIds: rapportsUIContext.setIds,
      openDeleteRapportsDialog: rapportsUIContext.openDeleteRapportsDialog,
      openFetchRapportsDialog: rapportsUIContext.openFetchRapportsDialog,
      openUpdateRapportsStatusDialog:
        rapportsUIContext.openUpdateRapportsStatusDialog,
    };
  }, [rapportsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                Les enregistrements sélectionnés comptent: <b>{rapportsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={rapportsUIProps.openUpdateRapportsStatusDialog}
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
