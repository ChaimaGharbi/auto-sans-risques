import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { ExpertStatusCssClasses } from "../ExpertsUIHelpers";
import { useExpertsUIContext } from "../ExpertsUIContext";

const selectedExperts = (entities, ids) => {
  const _experts = [];
  ids.forEach((id) => {
    const expert = entities.find((el) => el.id === id);
    if (expert) {
      _experts.push(expert);
    }
  });
  return _experts;
};

export function ExpertsFetchDialog({ show, onHide }) {
  // Experts UI Context
  const expertsUIContext = useExpertsUIContext();
  const expertsUIProps = useMemo(() => {
    return {
      ids: expertsUIContext.ids,
    };
  }, [expertsUIContext]);

  // Experts Redux state
  const { experts } = useSelector(
    (state) => ({
      experts: selectedExperts(state.experts.entities, expertsUIProps.ids),
    }),
    shallowEqual
  );

  // if experts weren't selected we should close modal
  useEffect(() => {
    if (!expertsUIProps.ids || expertsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline timeline-5 mt-3">
          {experts.map((expert) => (
            <div
              className="timeline-item align-items-start"
              key={`id${expert.id}`}
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
                  ID: {expert.id}
                </span>
                <span className="ml-3">
                  {expert.lastName}, {expert.firstName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
