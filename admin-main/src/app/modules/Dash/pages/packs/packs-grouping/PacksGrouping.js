import React, { useMemo } from "react";
import { usePacksUIContext } from "../PacksUIContext";

export function PacksGrouping() {
  // Packs UI Context
  const packsUIContext = usePacksUIContext();
  const packsUIProps = useMemo(() => {
    return {
      ids: packsUIContext.ids,
      setIds: packsUIContext.setIds,
      openDeletePacksDialog: packsUIContext.openDeletePacksDialog,
      openFetchPacksDialog: packsUIContext.openFetchPacksDialog,
      openUpdatePacksStatusDialog: packsUIContext.openUpdatePacksStatusDialog,
    };
  }, [packsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Les enregistrements sélectionnés comptent:
                  <b>{packsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={packsUIProps.openDeletePacksDialog}
              >
                <i className="fa fa-sync-alt"></i>Tout supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
