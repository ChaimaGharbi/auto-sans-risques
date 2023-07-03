import React, { useMemo } from "react";
import { useModeratorsUIContext } from "../ModeratorsUIContext";

export function ModeratorsGrouping() {
  // ModeratorsUI Context
  const moderatorsUIContext = useModeratorsUIContext();
  const moderatorsUIProps = useMemo(() => {
    return {
      ids: moderatorsUIContext.ids,
      setIds: moderatorsUIContext.setIds,
      openDeleteModeratorsDialog:
        moderatorsUIContext.openDeleteModeratorsDialog,
      openFetchModeratorsDialog: moderatorsUIContext.openFetchModeratorsDialog,
      openUpdateModeratorsStatusDialog:
        moderatorsUIContext.openUpdateModeratorsStatusDialog,
    };
  }, [moderatorsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Les enregistrements sélectionnés comptent:
                  <b>{moderatorsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={moderatorsUIProps.openDeleteModeratorsDialog}
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
