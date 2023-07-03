import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../../_metronic/_partials/controls";
import * as actions from "../../../../_redux/categories/categoriesActions";
import { useCategoriesUIContext } from "../CategoriesUIContext";

export function CategoryDeleteDialog({ id, show, onHide }) {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      setIds: categoriesUIContext.setIds,
      queryParams: categoriesUIContext.queryParams,
    };
  }, [categoriesUIContext]);

  // Categories Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.categories.actionsLoading }),
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

  const deleteCategory = () => {
    // server request for deleting category by id
    dispatch(actions.deleteCategory(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCategories(categoriesUIProps.queryParams));
      // clear selections list
      categoriesUIProps.setIds([]);
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
      Supprimer la catégorie
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {!isLoading && (
        <span>Souhaitez-vous supprimer cette catégorie?</span>
      )}
      {isLoading && <span>La catégorie est en train de suppression ...</span>}
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
          onClick={deleteCategory}
          className="btn btn-danger btn-elevate"
        >
          Supprimer la catégorie
        </button>
      </div>
    </Modal.Footer>
  </Modal>
  );
}
