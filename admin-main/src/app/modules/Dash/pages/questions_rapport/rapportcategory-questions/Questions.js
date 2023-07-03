import React, { useMemo } from "react";
import { QuestionsFilter } from "./QuestionsFilter";
import { QuestionsTable } from "./QuestionsTable";
import { QuestionsLoadingDialog } from "./QuestionsLoadingDialog";
import { QuestionsDeleteDialog } from "./QuestionsDeleteDialog";
import { QuestionDeleteDialog } from "./QuestionDeleteDialog";
import { QuestionsFetchDialog } from "./QuestionsFetchDialog";
import { QuestionsGrouping } from "./QuestionsGrouping";
import { QuestionEditDialog } from "./question-edit-dialog/QuestionEditDialog";
import { useQuestionsUIContext } from "./QuestionsUIContext";

export function Questions() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return { ids: questionsUIContext.ids };
  }, [questionsUIContext]);

  return (
    <>
      <QuestionsLoadingDialog />
      <QuestionEditDialog />
      <QuestionDeleteDialog />
      <QuestionsDeleteDialog />
      <QuestionsFetchDialog />
      <div className="form margin-b-30">
        <QuestionsFilter />
        {questionsUIProps.ids.length > 0 && <QuestionsGrouping />}
      </div>
      <QuestionsTable />
    </>
  );
}
