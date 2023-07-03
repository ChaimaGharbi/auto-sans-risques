import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/marks/marksActions";
import { useCategoriesUIContext } from "../MarksUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CategoriesDeleteDialog({ show, onHide }) {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      setIds: categoriesUIContext.setIds,
      queryParams: categoriesUIContext.queryParams,
    };
  }, [categoriesUIContext]);

  // Categories Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.marks.actionsLoading }),
    shallowEqual
  );

  // if categories weren't selected we should close modal
  useEffect(() => {
    if (!categoriesUIProps.ids || categoriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteMarks = () => {
    // server request for deleting category by selected ids
    dispatch(actions.deleteMarks(categoriesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchMarks(categoriesUIProps.queryParams)).then(() => {
        // clear selections list
        categoriesUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
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
          <span>
            Êtes-vous sûr de supprimer définitivement les catégories
            sélectionnées?
          </span>
        )}
        {isLoading && <span>Category are deleting...</span>}
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
            onClick={deleteMarks}
            className="btn btn-primary btn-elevate"
          >
            Supprimer
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
