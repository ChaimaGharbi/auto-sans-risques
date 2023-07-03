import React, { useMemo } from "react";
import { useReservationsUIContext } from "../ReservationsContext";

export function ReservationsGrouping() {
  // Reservations UI Context
  const reservationsUIContext = useReservationsUIContext();
  const reservationsUIProps = useMemo(() => {
    return {
      ids: reservationsUIContext.ids,
      setIds: reservationsUIContext.setIds,
      openDeleteReservationsDialog: reservationsUIContext.openDeleteReservationsDialog,
      openFetchReservationsDialog: reservationsUIContext.openFetchReservationsDialog,
      openUpdateReservationsStatusDialog:
        reservationsUIContext.openUpdateReservationsStatusDialog,
    };
  }, [reservationsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                Les enregistrements sélectionnés comptent: <b>{reservationsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={reservationsUIProps.openUpdateReservationsStatusDialog}
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
