import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rapportcategories/rapportcategoriesActions";
import { useRapportcategoriesUIContext } from "../RapportcategoriesUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function RapportcategoriesDeleteDialog({ show, onHide }) {
  // Rapportcategories UI Context
  const rapportcategoriesUIContext = useRapportcategoriesUIContext();
  const rapportcategoriesUIProps = useMemo(() => {
    return {
      ids: rapportcategoriesUIContext.ids,
      setIds: rapportcategoriesUIContext.setIds,
      queryParams: rapportcategoriesUIContext.queryParams,
    };
  }, [rapportcategoriesUIContext]);

  // Rapportcategories Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.rapportcategories.actionsLoading }),
    shallowEqual
  );

  // if rapportcategories weren't selected we should close modal
  useEffect(() => {
    if (!rapportcategoriesUIProps.ids || rapportcategoriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rapportcategoriesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteRapportcategories = () => {
    // server request for deleting rapportcategory by selected ids
    dispatch(actions.deleteRapportcategories(rapportcategoriesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchRapportcategories(rapportcategoriesUIProps.queryParams)).then(
        () => {
          // clear selections list
          rapportcategoriesUIProps.setIds([]);
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
          Supprimer les catégories
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Êtes-vous sûr de supprimer définitivement les catégories sélectionnées?</span>
        )}
        {isLoading && <span>Rapportcategory are deleting...</span>}
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
            onClick={deleteRapportcategories}
            className="btn btn-primary btn-elevate"
          >
            Supprimer
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
