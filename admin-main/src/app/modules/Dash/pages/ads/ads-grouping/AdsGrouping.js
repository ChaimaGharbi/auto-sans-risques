import React, { useMemo } from "react";
import { useAdsUIContext } from "../AdsUIContext";

export function AdsGrouping() {
  // AdsUI Context
  const adsUIContext = useAdsUIContext();
  const adsUIProps = useMemo(() => {
    return {
      ids: adsUIContext.ids,
      setIds: adsUIContext.setIds,
      openDeleteAdsDialog: adsUIContext.openDeleteAdsDialog,
      openFetchAdsDialog: adsUIContext.openFetchAdsDialog,
      openUpdateAdsStatusDialog: adsUIContext.openUpdateAdsStatusDialog,
    };
  }, [adsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Les enregistrements sélectionnés comptent:
                  <b>{adsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={adsUIProps.openDeleteAdsDialog}
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
