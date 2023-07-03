// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import {
  ClientAccStatusTitles,
  ClientAccStatusCssClasses,
} from "../../ClientsUIHelpers";

export function StatusEmailColumnFormatter(cellContent, row) {
  
  let x=1;
  if(row.isVerified===false) {
    x=0;
  }
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      ClientAccStatusCssClasses[x]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {ClientAccStatusTitles[x]}
    </span>
  );
}

