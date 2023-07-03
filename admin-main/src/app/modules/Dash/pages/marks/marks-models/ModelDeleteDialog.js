/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/models/modelsActions";
import { useArticlesUIContext } from "./ModelsUIContext";

export function ArticleDeleteDialog() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return {
      id: articlesUIContext.selectedId,
      setIds: articlesUIContext.setIds,
      categoryId: articlesUIContext.categoryId,
      queryParams: articlesUIContext.queryParams,
      showdeleteModelDialog: articlesUIContext.showdeleteModelDialog,
      closedeleteModelDialog: articlesUIContext.closedeleteModelDialog,
    };
  }, [articlesUIContext]);

  // Articles Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.models.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!articlesUIProps.id) {
      articlesUIProps.closedeleteModelDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteModel = () => {
    // server request for deleting article by id
    dispatch(actions.deleteModel(articlesUIProps.id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchModels(
          articlesUIProps.queryParams,
          articlesUIProps.categoryId
        )
      );
      // clear selections list
      articlesUIProps.setIds([]);
      // closing delete modal
      articlesUIProps.closedeleteModelDialog();
    });
  };

  return (
    <Modal
      show={articlesUIProps.showdeleteModelDialog}
      onHide={articlesUIProps.closedeleteModelDialog}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Supprimer l'article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Êtes-vous sûr de supprimer définitivement cet model?</span>
        )}
        {isLoading && <span>Le model est en cours de suppression...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={articlesUIProps.closedeleteModelDialog}
            className="btn btn-light btn-elevate"
          >
            Annuler
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteModel}
            className="btn btn-primary btn-elevate"
          >
            Supprimer le model
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
