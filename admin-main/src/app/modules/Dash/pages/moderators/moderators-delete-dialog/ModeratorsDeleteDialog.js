import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/moderators/moderatorsActions";
import { useModeratorsUIContext } from "../ModeratorsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ModeratorsDeleteDialog({ show, onHide }) {
  // ModeratorsUI Context
  const moderatorsUIContext = useModeratorsUIContext();
  const moderatorsUIProps = useMemo(() => {
    return {
      ids: moderatorsUIContext.ids,
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

  // if moderators weren't selected we should close modal
  useEffect(() => {
    if (!moderatorsUIProps.ids || moderatorsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moderatorsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteModerators = () => {
    // server request for deleting ad by selected ids
    dispatch(actions.deleteModerators(moderatorsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchModerators(moderatorsUIProps.queryParams)).then(
        () => {
          // clear selections list
          moderatorsUIProps.setIds([]);
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
          <span>
            Êtes-vous sûr de supprimer définitivement les Moderators
            sélectionnées?
          </span>
        )}
        {isLoading && <span>Moderator est en train de suppression...</span>}
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
            onClick={deleteModerators}
            className="btn btn-primary btn-elevate"
          >
            Supprimer
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
