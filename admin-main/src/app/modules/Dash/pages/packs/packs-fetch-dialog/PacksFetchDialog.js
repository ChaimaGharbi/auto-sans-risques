import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { PackStatusCssClasses } from "../PacksUIHelpers";
import { usePacksUIContext } from "../PacksUIContext";

const selectedPacks = (entities, ids) => {
  const _packs = [];
  ids.forEach((id) => {
    const pack = entities.find((el) => el.id === id);
    if (pack) {
      _packs.push(pack);
    }
  });
  return _packs;
};

export function PacksFetchDialog({ show, onHide }) {
  // Packs UI Context
  const packsUIContext = usePacksUIContext();
  const packsUIProps = useMemo(() => {
    return {
      ids: packsUIContext.ids,
    };
  }, [packsUIContext]);

  // Packs Redux state
  const { packs } = useSelector(
    (state) => ({
      packs: selectedPacks(
        state.packs.entities,
        packsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if packs weren't selected we should close modal
  useEffect(() => {
    if (!packsUIProps.ids || packsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packsUIProps.ids]);

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
          {packs.map((pack) => (
            <div className="timeline-item align-items-start" key={`id${pack.id}`}>
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    PackStatusCssClasses[pack.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                    className={`label label-lg label-light-${
                      PackStatusCssClasses[pack.status]
                    } label-inline`}
                  >
                    ID: {pack.id}
                </span>
                <span className="ml-3">{pack.lastName}, {pack.firstName}</span>                
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
