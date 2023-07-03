import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useArticlesUIContext } from "./ArticlesUIContext";

const selectedArticles = (entities, ids) => {
  const _articles = [];
  ids.forEach((id) => {
    const article = entities.find((el) => el.id === id);
    if (article) {
      _articles.push(article);
    }
  });
  return _articles;
};

export function ArticlesFetchDialog() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return {
      ids: articlesUIContext.ids,
      queryParams: articlesUIContext.queryParams,
      showFetchArticlesDialog: articlesUIContext.showFetchArticlesDialog,
      closeFetchArticlesDialog: articlesUIContext.closeFetchArticlesDialog,
    };
  }, [articlesUIContext]);

  const { articles } = useSelector(
    (state) => ({
      articles: selectedArticles(state.articles.entities, articlesUIProps.ids),
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!articlesUIProps.ids || articlesUIProps.ids.length === 0) {
      articlesUIProps.closeFetchArticlesDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesUIProps.ids]);

  return (
    <Modal
      show={articlesUIProps.showFetchArticlesDialog}
      onHide={articlesUIProps.closeFetchArticlesDialog}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {articles.map((article) => (
              <div className="list-timeline-item mb-3" key={article.id}>
                <span className="list-timeline-text">
                  <span
                    className="label label-lg label-light-success label-inline"
                    style={{ width: "60px" }}
                  >
                    ID: {article.id}
                  </span>{" "}
                  <span className="ml-5">{article.text} </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={articlesUIProps.closeFetchArticlesDialog}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={articlesUIProps.closeFetchArticlesDialog}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
