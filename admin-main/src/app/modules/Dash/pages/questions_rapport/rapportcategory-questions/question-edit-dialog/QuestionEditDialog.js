import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../_redux/questions/questionsActions";
import { QuestionEditDialogHeader } from "./QuestionEditDialogHeader";
import { QuestionEditForm } from "./QuestionEditForm";
import { useQuestionsUIContext } from "../QuestionsUIContext";

export function QuestionEditDialog() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      id: questionsUIContext.selectedId,
      setIds: questionsUIContext.setIds,
      categoryId: questionsUIContext.categoryId,
      queryParams: questionsUIContext.queryParams,
      showEditQuestionDialog: questionsUIContext.showEditQuestionDialog,
      closeEditQuestionDialog: questionsUIContext.closeEditQuestionDialog,
      initQuestion: questionsUIContext.initQuestion,
    };
  }, [questionsUIContext]);

  // Questions Redux state
  const dispatch = useDispatch();
  const { actionsLoading, questionForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.questions.actionsLoading,
      questionForEdit: state.questions.questionForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server request for getting question by seleted id
    dispatch(actions.fetchQuestion(questionsUIProps.id));
  }, [questionsUIProps.id, dispatch]);

  const saveQuestion = (question) => {
    
    if (!questionsUIProps.id) {
      // server request for creating questions
      dispatch(actions.createQuestion(question)).then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchQuestions(
            questionsUIProps.queryParams,
            questionsUIProps.categoryId
          )
        ).then(() => {
          // clear selections list
          questionsUIProps.setIds([]);
          // closing edit modal
          questionsUIProps.closeEditQuestionDialog();
        });
      });
    } else {
      // server request for updating questions
      dispatch(actions.updateQuestion(question)).then(() => {
        // refresh list after deletion
        dispatch(
          // refresh list after deletion
          actions.fetchQuestions(
            questionsUIProps.queryParams,
            questionsUIProps.categoryId
          )
        ).then(() => {
          // clear selections list
          questionsUIProps.setIds([]);
          // closing edit modal
          questionsUIProps.closeEditQuestionDialog();
        });
      });
    }
  };

  return (
    <Modal
      size="lg"
      show={questionsUIProps.showEditQuestionDialog}
      onHide={questionsUIProps.closeEditQuestionDialog}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <QuestionEditDialogHeader id={questionsUIProps.id} />
      <QuestionEditForm
        saveQuestion={saveQuestion}
        actionsLoading={actionsLoading}
        question={questionForEdit || questionsUIProps.initQuestion}
        onHide={questionsUIProps.closeEditQuestionDialog}
      />
    </Modal>
  );
}
