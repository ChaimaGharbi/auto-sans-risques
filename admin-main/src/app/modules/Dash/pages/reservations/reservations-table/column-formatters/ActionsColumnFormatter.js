// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditReservationDialog, openFetchReservationsDetailsDialog,openDeleteReservationDialog }
) {
  return (
    <>
      <a
        title="Delete reservation"
        className="btn btn-icon btn-light btn-hover-info btn-sm"
        onClick={() => openFetchReservationsDetailsDialog(row.reservationUser)}
      >
        <span className="svg-icon svg-icon-md svg-icon-info">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Other1.svg")} />
        </span>
      </a>
    </>
  );
}
