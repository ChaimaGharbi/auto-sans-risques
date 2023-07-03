import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ExpertStatusCssClasses } from "../ExpertsUIHelpers";
import * as actions from "../../../_redux/experts/expertsActions";
import { useExpertsUIContext } from "../ExpertsUIContext";

const selectedExperts = (entities, ids) => {
  const _experts = [];
  ids.forEach((id) => {
    const expert = entities.find((el) => el._id === id);
    if (expert) {
      _experts.push(expert);
    }
  });
  return _experts;
};

export function ExpertsUpdateStateDialog({ show, onHide }) {
  // Experts UI Context
  const expertsUIContext = useExpertsUIContext();
  const expertsUIProps = useMemo(() => {
    return {
      ids: expertsUIContext.ids,
      setIds: expertsUIContext.setIds,
      queryParams: expertsUIContext.queryParams,
    };
  }, [expertsUIContext]);

  // Experts Redux state
  const { experts, isLoading } = useSelector(
    (state) => ({
      experts: selectedExperts(state.experts.entities, expertsUIProps.ids),
      isLoading: state.experts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!expertsUIProps.ids || expertsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update experts status by selected ids
    dispatch(actions.updateExpertsStatus(expertsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchExperts(expertsUIProps.queryParams)).then(() => {
          // clear selections list
          expertsUIProps.setIds([]);
          // closing delete modal
          onHide();
        });
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
          Le statut sera mis à jour pour les utilisateurs sélectionnés
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
          {experts.map((expert) => (
            <div
              className="timeline-item align-items-start"
              key={`expertsUpdate${expert._id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    ExpertStatusCssClasses[expert.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    ExpertStatusCssClasses[expert.status]
                  } label-inline`}
                >
                  ID: {expert._id}
                </span>
                <span className="ml-3">{expert.email}</span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">En Attente</option>
            <option value="1">Active</option>
            <option value="2">Banni(e)</option>
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
            Modifier Statut
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
