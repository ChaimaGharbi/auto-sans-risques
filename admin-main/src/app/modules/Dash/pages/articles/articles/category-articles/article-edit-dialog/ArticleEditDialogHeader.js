/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../../_metronic/_partials/controls";

export function ArticleEditDialogHeader({ id }) {
  const [title, setTitle] = useState("");
  // Articles Redux state
  const { articleForEdit, actionsLoading } = useSelector(
    (state) => ({
      articleForEdit: state.articles.articleForEdit,
      actionsLoading: state.articles.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : "Nouvel Article";
    if (articleForEdit && id) {
      _title = "Modifier article "+articleForEdit.title;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [articleForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
