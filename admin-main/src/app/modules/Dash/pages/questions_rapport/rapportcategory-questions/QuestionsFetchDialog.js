import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { useQuestionsUIContext } from "./QuestionsUIContext";

const selectedQuestions = (entities, ids) => {
  const _questions = [];
  ids.forEach((id) => {
    const question = entities.find((el) => el.id === id);
    if (question) {
      _questions.push(question);
    }
  });
  return _questions;
};

export function QuestionsFetchDialog() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      ids: questionsUIContext.ids,
      queryParams: questionsUIContext.queryParams,
      showFetchQuestionsDialog: questionsUIContext.showFetchQuestionsDialog,
      closeFetchQuestionsDialog: questionsUIContext.closeFetchQuestionsDialog,
    };
  }, [questionsUIContext]);

  const { questions } = useSelector(
    (state) => ({
      questions: selectedQuestions(state.questions.entities, questionsUIProps.ids),
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!questionsUIProps.ids || questionsUIProps.ids.length === 0) {
      questionsUIProps.closeFetchQuestionsDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsUIProps.ids]);

  return (
    <Modal
      show={questionsUIProps.showFetchQuestionsDialog}
      onHide={questionsUIProps.closeFetchQuestionsDialog}
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
            {questions.map((question) => (
              <div className="list-timeline-item mb-3" key={question.id}>
                <span className="list-timeline-text">
                  <span
                    className="label label-lg label-light-success label-inline"
                    style={{ width: "60px" }}
                  >
                    ID: {question.id}
                  </span>{" "}
                  <span className="ml-5">{question.text} </span>
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
            onClick={questionsUIProps.closeFetchQuestionsDialog}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={questionsUIProps.closeFetchQuestionsDialog}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
