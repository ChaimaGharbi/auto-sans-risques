import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ReservationStatusCssClasses } from "../ReservationsUIHelpers";
import * as actions from "../../../_redux/reservations/reservationsActions";
import { useReservationsUIContext } from "../ReservationsContext";

const selectedReservations = (entities, ids) => {
  const _reservations = [];
  ids.forEach((id) => {
    const reservation = entities.find((el) => el._id === id);
    if (reservation) {
      _reservations.push(reservation);
    }
  });
  return _reservations;
};

export function ReservationsUpdateStateDialog({ show, onHide }) {
  // Reservations UI Context
  const reservationsUIContext = useReservationsUIContext();
  const reservationsUIProps = useMemo(() => {
    return {
      ids: reservationsUIContext.ids,
      setIds: reservationsUIContext.setIds,
      queryParams: reservationsUIContext.queryParams,
    };
  }, [reservationsUIContext]);

  // Reservations Redux state
  const { reservations, isLoading } = useSelector(
    (state) => ({
      reservations: selectedReservations(state.reservations.entities, reservationsUIProps.ids),
      isLoading: state.reservations.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!reservationsUIProps.ids || reservationsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservationsUIProps.ids]);

  const [etat, setEtat] = useState('EN_ATTENTE');

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update reservations status by selected ids
    dispatch(actions.updateReservationsStatus(reservationsUIProps.ids, etat)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchReservations(reservationsUIProps.queryParams)).then(
          () => {
            // clear selections list
            reservationsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          L'etat sera mis à jour pour les reservations sélectionnés
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}

        <div className="timeline timeline-5 mt-3">
          {reservations.map((reservation) => {
            let x = 0;
            if (reservation.etat === "en attente") {
              x = 0;
            } else if (reservation.etat === "complété") {
              x = 1;
            } else if (reservation.etat === "échoué") {
              x = 2;
            } else if (reservation.etat === "ANNULEE") {
              x = 3;
            }
            return (
              <div
                className="timeline-item align-items-start"
                key={`reservationsUpdate${reservation._id}`}
              >
                <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
                <div className="timeline-badge">
                  <i
                    className={`fa fa-genderless text-${
                      ReservationStatusCssClasses[x]
                    } icon-xxl`}
                  />
                </div>
                <div className="timeline-content text-dark-50 mr-5">
                  <span
                    className={`label label-lg label-light-${
                      ReservationStatusCssClasses[x]
                    } label-inline`}
                  >
                    ID: {reservation._id}
                  </span>
                  <span className="ml-3">{reservation.etat}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={etat}
            onChange={(e) => setEtat(e.target.value)}
          >
            <option value="annulé">Annulé</option>
            <option value="en attente">En Attente</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Modifier Etat
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
