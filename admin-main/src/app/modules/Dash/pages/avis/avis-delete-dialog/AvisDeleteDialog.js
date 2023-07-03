import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/avis/avisActions";
import { useAvisUIContext } from "../AvisUIContext";

export function AvisDeleteDialog({ id, show, onHide }) {
  // Avis UI Context
  const avisUIContext = useAvisUIContext();
  const avisUIProps = useMemo(() => {
    return {
      setIds: avisUIContext.setIds,
      queryParams: avisUIContext.queryParams,
    };
  }, [avisUIContext]);

  // Avis Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.avis.actionsLoading }),
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

  const deleteAvis = () => {
    // server request for deleting avis by id
    dispatch(actions.deleteAvisById(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAvis(avisUIProps.queryParams));
      // clear selections list
      avisUIProps.setIds([]);
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
      Supprimer le avis
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {!isLoading && (
        <span>Souhaitez-vous supprimer cette avis?</span>
      )}
      {isLoading && <span>Le avis est en train de suppression ...</span>}
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
          onClick={deleteAvis}
          className="btn btn-danger btn-elevate"
        >
          Supprimer l'avis
        </button>
      </div>
    </Modal.Footer>
  </Modal>
  );
}
