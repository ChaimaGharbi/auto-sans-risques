/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/questions/questionsActions";
import { useQuestionsUIContext } from "./QuestionsUIContext";

export function QuestionDeleteDialog() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      id: questionsUIContext.selectedId,
      setIds: questionsUIContext.setIds,
      categoryId: questionsUIContext.categoryId,
      queryParams: questionsUIContext.queryParams,
      showDeleteQuestionDialog: questionsUIContext.showDeleteQuestionDialog,
      closeDeleteQuestionDialog: questionsUIContext.closeDeleteQuestionDialog,
    };
  }, [questionsUIContext]);

  // Questions Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.questions.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!questionsUIProps.id) {
      questionsUIProps.closeDeleteQuestionDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteQuestion = () => {
    // server request for deleting question by id
    dispatch(actions.deleteQuestion(questionsUIProps.id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchQuestions(
          questionsUIProps.queryParams,
          questionsUIProps.categoryId
        )
      );
      // clear selections list
      questionsUIProps.setIds([]);
      // closing delete modal
      questionsUIProps.closeDeleteQuestionDialog();
    });
  };

  return (
    <Modal
      show={questionsUIProps.showDeleteQuestionDialog}
      onHide={questionsUIProps.closeDeleteQuestionDialog}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
         Supprimer l'question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Êtes-vous sûr de supprimer définitivement cet question?</span>
        )}
        {isLoading && <span>L'question est en cours de suppression...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={questionsUIProps.closeDeleteQuestionDialog}
            className="btn btn-light btn-elevate"
          >
            Annuler
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteQuestion}
            className="btn btn-primary btn-elevate"
          >
            Supprimer
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
