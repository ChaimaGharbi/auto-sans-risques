import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/moderators/moderatorsActions";
import { useModeratorsUIContext } from "../ModeratorsUIContext";

export function ModeratorDeleteDialog({ id, show, onHide }) {
  // ModeratorsUI Context
  const moderatorsUIContext = useModeratorsUIContext();
  const moderatorsUIProps = useMemo(() => {
    return {
      setIds: moderatorsUIContext.setIds,
      queryParams: moderatorsUIContext.queryParams,
    };
  }, [moderatorsUIContext]);

  // ModeratorsRedux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.moderators.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteModerator = () => {
    // server request for deleting ad by id
    dispatch(actions.deleteModerator(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchModerators(moderatorsUIProps.queryParams));
      // clear selections list
      moderatorsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Supprimer le moderator
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Souhaitez-vous supprimer cette ad?</span>}
        {isLoading && <span>Le ad est en train de suppression ...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            fermer
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteModerator}
            className="btn btn-danger btn-elevate"
          >
            Supprimer le moderator
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
