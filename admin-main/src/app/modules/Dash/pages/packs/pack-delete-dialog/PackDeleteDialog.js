import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/packs/packsActions";
import { usePacksUIContext } from "../PacksUIContext";

export function PackDeleteDialog({ id, show, onHide }) {
  // Packs UI Context
  const packsUIContext = usePacksUIContext();
  const packsUIProps = useMemo(() => {
    return {
      setIds: packsUIContext.setIds,
      queryParams: packsUIContext.queryParams,
    };
  }, [packsUIContext]);

  // Packs Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.packs.actionsLoading }),
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

  const deletePack = () => {
    // server request for deleting pack by id
    dispatch(actions.deletePack(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPacks(packsUIProps.queryParams));
      // clear selections list
      packsUIProps.setIds([]);
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
      Supprimer le pack
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {!isLoading && (
        <span>Souhaitez-vous supprimer cette pack?</span>
      )}
      {isLoading && <span>Le pack est en train de suppression ...</span>}
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
          onClick={deletePack}
          className="btn btn-danger btn-elevate"
        >
          Supprimer le pack
        </button>
      </div>
    </Modal.Footer>
  </Modal>
  );
}
