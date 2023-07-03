/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/questions/questionsActions";
import { useQuestionsUIContext } from "./QuestionsUIContext";

export function QuestionsDeleteDialog() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      ids: questionsUIContext.ids,
      setIds: questionsUIContext.setIds,
      categoryId: questionsUIContext.categoryId,
      queryParams: questionsUIContext.queryParams,
      showDeleteQuestionsDialog: questionsUIContext.showDeleteQuestionsDialog,
      closeDeleteQuestionsDialog: questionsUIContext.closeDeleteQuestionsDialog,
    };
  }, [questionsUIContext]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.questions.actionsLoading }),
    shallowEqual
  );

  useEffect(() => {}, [isLoading, dispatch]);
  useEffect(() => {
    if (!questionsUIProps.ids || questionsUIProps.ids.length === 0) {
      questionsUIProps.closeDeleteQuestionsDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsUIProps.ids]);

  const deleteQuestions = () => {
    dispatch(actions.deleteQuestions(questionsUIProps.ids)).then(() => {
      dispatch(
        actions.fetchQuestions(
          questionsUIProps.queryParams,
          questionsUIProps.categoryId
        )
      ).then(() => {
        questionsUIProps.setIds([]);
        questionsUIProps.closeDeleteQuestionsDialog();
      });
    });
  };

  return (
    <Modal
      show={questionsUIProps.showDeleteQuestionsDialog}
      onHide={questionsUIProps.closeDeleteQuestionsDialog}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Questions Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected questions?</span>
        )}
        {isLoading && <span>Questions are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={questionsUIProps.closeDeleteQuestionsDialog}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteQuestions}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
