import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../_redux/articles/articlesActions";
import { ArticleEditDialogHeader } from "./ArticleEditDialogHeader";
import { ArticleEditForm } from "./ArticleEditForm";
import { useArticlesUIContext } from "../ArticlesUIContext";

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
      actionsLoading: state.articles.actionsLoading,
      articleForEdit: state.articles.articleForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server request for getting article by seleted id
    dispatch(actions.fetchArticle(articlesUIProps.id));
  }, [articlesUIProps.id, dispatch]);

  const saveArticle = (article) => {
    
    if (!articlesUIProps.id) {
      // server request for creating articles
      dispatch(actions.createArticle(article)).then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchArticles(
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
      dispatch(actions.updateArticle(article)).then(() => {
        // refresh list after deletion
        dispatch(
          // refresh list after deletion
          actions.fetchArticles(
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
      size="lg"
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
