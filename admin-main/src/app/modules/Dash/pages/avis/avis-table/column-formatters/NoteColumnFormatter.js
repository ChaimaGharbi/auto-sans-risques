// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";
import StarIcon from "./icons/StarIcon";

export function NoteColumnFormatter(cellContent, row) {
  let stars = [];
  for (var i = 0; i < 5; i++) {
    if (row.note > i) {
      stars.push(<StarIcon className="tw-h-5 tw-w-5" key={i} style={{ color: "#FF9529" }} />);
    } else {
      stars.push(<StarIcon className="tw-h-5 tw-w-5" key={i} style={{ color: "#C8C8C8" }} />);
    }
  }
  return <div className="tw-flex tw-flex-row">{stars}</div>;
}
