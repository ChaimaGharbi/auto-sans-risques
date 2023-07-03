/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../../_metronic/_partials/controls";
import * as actions from "../../../../_redux/articles/articlesActions";
import { useArticlesUIContext } from "./ArticlesUIContext";

export function ArticlesDeleteDialog() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return {
      ids: articlesUIContext.ids,
      setIds: articlesUIContext.setIds,
      categoryId: articlesUIContext.categoryId,
      queryParams: articlesUIContext.queryParams,
      showDeleteArticlesDialog: articlesUIContext.showDeleteArticlesDialog,
      closeDeleteArticlesDialog: articlesUIContext.closeDeleteArticlesDialog,
    };
  }, [articlesUIContext]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.articles.actionsLoading }),
    shallowEqual
  );

  useEffect(() => {}, [isLoading, dispatch]);
  useEffect(() => {
    if (!articlesUIProps.ids || articlesUIProps.ids.length === 0) {
      articlesUIProps.closeDeleteArticlesDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesUIProps.ids]);

  const deleteArticles = () => {
    dispatch(actions.deleteArticles(articlesUIProps.ids)).then(() => {
      dispatch(
        actions.fetchArticles(
          articlesUIProps.queryParams,
          articlesUIProps.categoryId
        )
      ).then(() => {
        articlesUIProps.setIds([]);
        articlesUIProps.closeDeleteArticlesDialog();
      });
    });
  };

  return (
    <Modal
      show={articlesUIProps.showDeleteArticlesDialog}
      onHide={articlesUIProps.closeDeleteArticlesDialog}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Articles Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected articles?</span>
        )}
        {isLoading && <span>Articles are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={articlesUIProps.closeDeleteArticlesDialog}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteArticles}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
