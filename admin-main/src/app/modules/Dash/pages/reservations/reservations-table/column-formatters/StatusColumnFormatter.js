// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import {
  ReservationStatusCssClasses,
  ReservationStatusTitles,
} from "../../ReservationsUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
  let x = 0;

  if(row.status === "EN_ATTENTE") {
    x= 0;
  } else if (row.status === "ACCEPTEE") {
    x= 1;
  } else if (row.status === "REFUSEE") {
    x= 2;
  } else if (row.status === "COMPLETEE") {
    x= 3;
  }

  const getLabelCssClasses = () => {
    return `label label-lg label-light-${
      ReservationStatusCssClasses[x]
    } label-inline`;
  };
  return (
    <span className={getLabelCssClasses()}>
      {ReservationStatusTitles[x]}
    </span>
  );
}


