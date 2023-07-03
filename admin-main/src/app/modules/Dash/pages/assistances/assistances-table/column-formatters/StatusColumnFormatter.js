// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import {
  AssistanceStatusCssClasses,
  AssistanceStatusTitles,
} from "../../AssistancesUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
  let x = 0;

  if(row.etat === "EN_ATTENTE") {
    x= 0;
  } else if (row.etat === "CONTACTE") {
    x= 1;
  }

  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      AssistanceStatusCssClasses[x]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {AssistanceStatusTitles[x]}
    </span>
  );
}


