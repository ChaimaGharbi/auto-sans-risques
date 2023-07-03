import React, { useMemo } from "react";
import { useQuestionsUIContext } from "./QuestionsUIContext";

export function QuestionsGrouping() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      ids: questionsUIContext.ids,
      openDeleteQuestionsDialog: questionsUIContext.openDeleteQuestionsDialog,
      openFetchQuestionsDialog: questionsUIContext.openFetchQuestionsDialog,
    };
  }, [questionsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger mt-5">
                <span>Les enregistrements sélectionnés comptent: {questionsUIProps.ids.length}</span>
              </label>
            </div>
            <div className="form-group-inline">
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={questionsUIProps.openDeleteQuestionsDialog}
              >
                <i className="fa fa-trash"></i> Tout supprimer
              </button>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
