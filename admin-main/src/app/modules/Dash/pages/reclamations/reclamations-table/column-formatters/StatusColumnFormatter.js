// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import {
  ReclamationStatusCssClasses,
  ReclamationStatusTitles,
} from "../../ReclamationsUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
  let x = 0;

  if(row.etat === "EN_ATTENTE") {
    x= 0;
  } else if (row.etat === "EN_COURS") {
    x= 1;
  } else if (row.etat === "RESOLU") {
    x= 2;
  }

  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      ReclamationStatusCssClasses[x]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {ReclamationStatusTitles[x]}
    </span>
  );
}


