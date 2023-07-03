import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ReclamationStatusCssClasses } from "../ReclamationsUIHelpers";
import * as actions from "../../../_redux/reclamations/reclamationsActions";
import { useReclamationsUIContext } from "../ReclamationsUIContext";

const selectedReclamations = (entities, ids) => {
  const _reclamations = [];
  ids.forEach((id) => {
    const rapport = entities.find((el) => el._id === id);
    if (rapport) {
      _reclamations.push(rapport);
    }
  });
  return _reclamations;
};

export function ReclamationsUpdateStateDialog({ show, onHide }) {
  // Reclamations UI Context
  const reclamationsUIContext = useReclamationsUIContext();
  const reclamationsUIProps = useMemo(() => {
    return {
      ids: reclamationsUIContext.ids,
      setIds: reclamationsUIContext.setIds,
      queryParams: reclamationsUIContext.queryParams,
    };
  }, [reclamationsUIContext]);

  // Reclamations Redux state
  const { reclamations, isLoading } = useSelector(
    (state) => ({
      reclamations: selectedReclamations(
        state.reclamations.entities,
        reclamationsUIProps.ids
      ),
      isLoading: state.reclamations.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!reclamationsUIProps.ids || reclamationsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reclamationsUIProps.ids]);

  const [etat, setEtat] = useState("EN_ATTENTE");

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update reclamations status by selected ids
    dispatch(
      actions.updateReclamationsStatus(reclamationsUIProps.ids, etat)
    ).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchReclamations(reclamationsUIProps.queryParams)).then(
        () => {
          // clear selections list
          reclamationsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          L'etat sera mis à jour pour les reclamations sélectionnés
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
          {reclamations.map((reclamation) => {
            let x = 0;
            if (reclamation.etat === "EN_ATTENTE") {
              x = 0;
            } else if (reclamation.etat === "EN_COURS") {
              x = 1;
            } else if (reclamation.etat === "RESOLU") {
              x = 2;
            }
            return (
              <div
                className="timeline-item align-items-start"
                key={`reclamationsUpdate${reclamation._id}`}
              >
                <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
                <div className="timeline-badge">
                  <i
                    className={`fa fa-genderless text-${ReclamationStatusCssClasses[x]} icon-xxl`}
                  />
                </div>
                <div className="timeline-content text-dark-50 mr-5">
                  <span
                    className={`label label-lg label-light-${ReclamationStatusCssClasses[x]} label-inline`}
                  >
                    ID: {reclamation._id}
                  </span>
                  <span className="ml-3">{reclamation.etat}</span>
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
            <option value="EN_ATTENTE">EN_ATTENTE</option>
            <option value="EN_COURS">EN_COURS</option>
            <option value="RESOLU">RESOLU</option>
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
