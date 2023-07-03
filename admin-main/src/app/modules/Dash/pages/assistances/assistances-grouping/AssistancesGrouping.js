import React, { useMemo } from "react";
import { useAssistancesUIContext } from "../AssistancesUIContext";

export function AssistancesGrouping() {
  // Assistances UI Context
  const assistancesUIContext = useAssistancesUIContext();
  const assistancesUIProps = useMemo(() => {
    return {
      ids: assistancesUIContext.ids,
      setIds: assistancesUIContext.setIds,
      openDeleteAssistancesDialog: assistancesUIContext.openDeleteAssistancesDialog,
      openFetchAssistancesDialog: assistancesUIContext.openFetchAssistancesDialog,
      openUpdateAssistancesStatusDialog:
        assistancesUIContext.openUpdateAssistancesStatusDialog,
    };
  }, [assistancesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                Les enregistrements sélectionnés comptent: <b>{assistancesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={assistancesUIProps.openUpdateAssistancesStatusDialog}
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
