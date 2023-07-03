/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../../_metronic/_partials/controls";
import * as actions from "../../../../_redux/articles/articlesActions";
import { useArticlesUIContext } from "./ArticlesUIContext";

export function ArticleDeleteDialog() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return {
      id: articlesUIContext.selectedId,
      setIds: articlesUIContext.setIds,
      categoryId: articlesUIContext.categoryId,
      queryParams: articlesUIContext.queryParams,
      showDeleteArticleDialog: articlesUIContext.showDeleteArticleDialog,
      closeDeleteArticleDialog: articlesUIContext.closeDeleteArticleDialog,
    };
  }, [articlesUIContext]);

  // Articles Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.articles.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!articlesUIProps.id) {
      articlesUIProps.closeDeleteArticleDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteArticle = () => {
    // server request for deleting article by id
    dispatch(actions.deleteArticle(articlesUIProps.id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchArticles(
          articlesUIProps.queryParams,
          articlesUIProps.categoryId
        )
      );
      // clear selections list
      articlesUIProps.setIds([]);
      // closing delete modal
      articlesUIProps.closeDeleteArticleDialog();
    });
  };

  return (
    <Modal
      show={articlesUIProps.showDeleteArticleDialog}
      onHide={articlesUIProps.closeDeleteArticleDialog}
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
          <span>Êtes-vous sûr de supprimer définitivement cet article?</span>
        )}
        {isLoading && <span>L'article est en cours de suppression...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={articlesUIProps.closeDeleteArticleDialog}
            className="btn btn-light btn-elevate"
          >
            Annuler
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteArticle}
            className="btn btn-primary btn-elevate"
          >
            Supprimer
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
