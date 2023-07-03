import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/avis/avisActions";
import { useAvisUIContext } from "../AvisUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function AvissDeleteDialog({ show, onHide }) {
  // Aviss UI Context
  const avissUIContext = useAvisUIContext();
  const avissUIProps = useMemo(() => {
    return {
      ids: avissUIContext.ids,
      setIds: avissUIContext.setIds,
      queryParams: avissUIContext.queryParams,
    };
  }, [avissUIContext]);

  // Aviss Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.avis.actionsLoading }),
    shallowEqual
  );

  // if aviss weren't selected we should close modal
  useEffect(() => {
    if (!avissUIProps.ids || avissUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avissUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAviss = () => {
    
    // server request for deleting avis by selected ids
    dispatch(actions.deleteAviss(avissUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAvis(avissUIProps.queryParams)).then(
        () => {
          // clear selections list
          avissUIProps.setIds([]);
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
          Supprimer Avis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Êtes-vous sûr de supprimer définitivement les avis sélectionnées?</span>
        )}
        {isLoading && <span>Aviss est en train de suppression...</span>}
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
            onClick={deleteAviss}
            className="btn btn-primary btn-elevate"
          >
            Supprimer
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
