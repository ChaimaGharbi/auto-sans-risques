import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RapportStatusCssClasses } from "../RapportsUIHelpers";
import * as actions from "../../../_redux/rapports/rapportsActions";
import { useRapportsUIContext } from "../RapportsUIContext";

const selectedRapports = (entities, ids) => {
  const _rapports = [];
  ids.forEach((id) => {
    const rapport = entities.find((el) => el._id === id);
    if (rapport) {
      _rapports.push(rapport);
    }
  });
  return _rapports;
};

export function RapportsUpdateStateDialog({ show, onHide }) {
  // Rapports UI Context
  const rapportsUIContext = useRapportsUIContext();
  const rapportsUIProps = useMemo(() => {
    return {
      ids: rapportsUIContext.ids,
      setIds: rapportsUIContext.setIds,
      queryParams: rapportsUIContext.queryParams,
    };
  }, [rapportsUIContext]);

  // Rapports Redux state
  const { rapports, isLoading } = useSelector(
    (state) => ({
      rapports: selectedRapports(state.rapports.entities, rapportsUIProps.ids),
      isLoading: state.rapports.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!rapportsUIProps.ids || rapportsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rapportsUIProps.ids]);

  const [etat, setEtat] = useState('annulé');

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update rapports status by selected ids
    dispatch(actions.updateRapportsStatus(rapportsUIProps.ids, etat)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchRapports(rapportsUIProps.queryParams)).then(
          () => {
            // clear selections list
            rapportsUIProps.setIds([]);
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
          L'etat sera mis à jour pour les rapports sélectionnés
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
          {rapports.map((rapport) => {
            let x = 0;
            if (rapport.etat === "en attente") {
              x = 0;
            } else if (rapport.etat === "complété") {
              x = 1;
            } else if (rapport.etat === "échoué") {
              x = 2;
            } else if (rapport.etat === "annulé") {
              x = 3;
            }
            return (
              <div
                className="timeline-item align-items-start"
                key={`rapportsUpdate${rapport._id}`}
              >
                <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
                <div className="timeline-badge">
                  <i
                    className={`fa fa-genderless text-${
                      RapportStatusCssClasses[x]
                    } icon-xxl`}
                  />
                </div>
                <div className="timeline-content text-dark-50 mr-5">
                  <span
                    className={`label label-lg label-light-${
                      RapportStatusCssClasses[x]
                    } label-inline`}
                  >
                    ID: {rapport._id}
                  </span>
                  <span className="ml-3">{rapport.etat}</span>
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
