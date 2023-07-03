import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AssistanceStatusCssClasses } from "../AssistancesUIHelpers";
import * as actions from "../../../_redux/assistances/assistancesActions";
import { useAssistancesUIContext } from "../AssistancesUIContext";

const selectedAssistances = (entities, ids) => {
  const _assistances = [];
  ids.forEach((id) => {
    const assistance = entities.find((el) => el._id === id);
    if (assistance) {
      _assistances.push(assistance);
    }
  });
  return _assistances;
};

export function AssistancesUpdateStateDialog({ show, onHide }) {
  // Assistances UI Context
  const assistancesUIContext = useAssistancesUIContext();
  const assistancesUIProps = useMemo(() => {
    return {
      ids: assistancesUIContext.ids,
      setIds: assistancesUIContext.setIds,
      queryParams: assistancesUIContext.queryParams,
    };
  }, [assistancesUIContext]);

  // Assistances Redux state
  const { assistances, isLoading } = useSelector(
    (state) => ({
      assistances: selectedAssistances(
        state.assistances.entities,
        assistancesUIProps.ids
      ),
      isLoading: state.assistances.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!assistancesUIProps.ids || assistancesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistancesUIProps.ids]);

  const [etat, setEtat] = useState("EN_ATTENTE");

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update assistances status by selected ids
    dispatch(
      actions.updateAssistancesStatus(assistancesUIProps.ids, etat)
    ).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAssistances(assistancesUIProps.queryParams)).then(
        () => {
          // clear selections list
          assistancesUIProps.setIds([]);
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
          L'etat sera mis à jour pour les assistances sélectionnés
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
          {assistances.map((assistance) => {
            let x = 0;
            if (assistance.etat === "EN_ATTENTE") {
              x = 0;
            } else if (assistance.etat === "CONTACTE") {
              x = 1;
            }
            return (
              <div
                className="timeline-item align-items-start"
                key={`assistancesUpdate${assistance._id}`}
              >
                <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
                <div className="timeline-badge">
                  <i
                    className={`fa fa-genderless text-${AssistanceStatusCssClasses[x]} icon-xxl`}
                  />
                </div>
                <div className="timeline-content text-dark-50 mr-5">
                  <span
                    className={`label label-lg label-light-${AssistanceStatusCssClasses[x]} label-inline`}
                  >
                    ID: {assistance._id}
                  </span>
                  <span className="ml-3">{assistance.etat}</span>
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
            <option value="CONTACTE">CONTACTE</option>
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
