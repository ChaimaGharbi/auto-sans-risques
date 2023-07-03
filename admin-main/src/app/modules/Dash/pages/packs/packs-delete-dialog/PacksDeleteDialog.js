import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/packs/packsActions";
import { usePacksUIContext } from "../PacksUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function PacksDeleteDialog({ show, onHide }) {
  // Packs UI Context
  const packsUIContext = usePacksUIContext();
  const packsUIProps = useMemo(() => {
    return {
      ids: packsUIContext.ids,
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

  // if packs weren't selected we should close modal
  useEffect(() => {
    if (!packsUIProps.ids || packsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePacks = () => {
    // server request for deleting pack by selected ids
    dispatch(actions.deletePacks(packsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPacks(packsUIProps.queryParams)).then(
        () => {
          // clear selections list
          packsUIProps.setIds([]);
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
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Supprimer Packs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Êtes-vous sûr de supprimer définitivement les packs sélectionnées?</span>
        )}
        {isLoading && <span>Packs est en train de suppression...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Annuler
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePacks}
            className="btn btn-primary btn-elevate"
          >
            Supprimer
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
