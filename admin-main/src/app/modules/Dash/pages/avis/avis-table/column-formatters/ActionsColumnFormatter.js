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
  { openFetchAvisDetailsDialog, openDeleteAvisDialog }
) {
  return (
    <div className="tw-flex tw-items-center tw-space-x-2">
      <a
        title="Supprimer Avis"
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteAvisDialog(row._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Close.svg")} />
        </span>
      </a>
      <a
        title="Avis détails"
        className="btn btn-icon btn-light btn-hover-info btn-sm"
        onClick={() => openFetchAvisDetailsDialog(row._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-info">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Other1.svg")} />
        </span>
      </a>
    </div>
  );
}
