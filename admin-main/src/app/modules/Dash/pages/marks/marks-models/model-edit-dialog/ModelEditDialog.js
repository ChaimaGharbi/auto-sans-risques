import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../_redux/models/modelsActions";
import { ArticleEditDialogHeader } from "./ModelEditDialogHeader";
import { ArticleEditForm } from "./ModelEditForm";
import { useArticlesUIContext } from "../ModelsUIContext";

export function ArticleEditDialog() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return {
      id: articlesUIContext.selectedId,
      setIds: articlesUIContext.setIds,
      categoryId: articlesUIContext.categoryId,
      queryParams: articlesUIContext.queryParams,
      showEditArticleDialog: articlesUIContext.showEditArticleDialog,
      closeEditArticleDialog: articlesUIContext.closeEditArticleDialog,
      initArticle: articlesUIContext.initArticle,
    };
  }, [articlesUIContext]);

  // Articles Redux state
  const dispatch = useDispatch();
  const { actionsLoading, articleForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.models.actionsLoading,
      articleForEdit: state.models.modelForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server request for getting article by seleted id
    dispatch(actions.fetchModel(articlesUIProps.id));
  }, [articlesUIProps.id, dispatch]);

  const saveArticle = (article) => {
    
    
    if (!articlesUIProps.id) {
      // server request for creating articles
      article.modelId = articlesUIProps.categoryId;
      dispatch(actions.createModel(article)).then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchModels(
            articlesUIProps.queryParams,
            articlesUIProps.categoryId
          )
        ).then(() => {
          // clear selections list
          articlesUIProps.setIds([]);
          // closing edit modal
          articlesUIProps.closeEditArticleDialog();
        });
      });
    } else {
      // server request for updating articles
      dispatch(actions.updateModel(article)).then(() => {
        // refresh list after deletion
        dispatch(
          // refresh list after deletion
          actions.fetchModels(
            articlesUIProps.queryParams,
            articlesUIProps.categoryId
          )
        ).then(() => {
          // clear selections list
          articlesUIProps.setIds([]);
          // closing edit modal
          articlesUIProps.closeEditArticleDialog();
        });
      });
    }
  };

  return (
    <Modal
      size="md"
      show={articlesUIProps.showEditArticleDialog}
      onHide={articlesUIProps.closeEditArticleDialog}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ArticleEditDialogHeader id={articlesUIProps.id} />
      <ArticleEditForm
        saveArticle={saveArticle}
        actionsLoading={actionsLoading}
        article={articleForEdit || articlesUIProps.initArticle}
        onHide={articlesUIProps.closeEditArticleDialog}
      />
    </Modal>
  );
}
