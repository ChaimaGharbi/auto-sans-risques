/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../_metronic/_partials/controls";

export function QuestionEditDialogHeader({ id }) {
  const [title, setTitle] = useState("");
  // Questions Redux state
  const { questionForEdit, actionsLoading } = useSelector(
    (state) => ({
      questionForEdit: state.questions.questionForEdit,
      actionsLoading: state.questions.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : "Nouvelle Question";
    if (questionForEdit && id) {
      _title = "Modifier question "+questionForEdit.question;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [questionForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
