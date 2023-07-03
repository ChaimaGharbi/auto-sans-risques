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
  { openEditPackDialog ,openDeletePackDialog }
) {
  return (
    <>
      <a
        title="Supprimer Catégorie"
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeletePackDialog(row._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Close.svg")} />
        </span>
      </a>
      <> </>
      <a
        title="Modifier Catégorie"
        className="btn btn-icon btn-light btn-hover-info btn-sm"
        onClick={() => openEditPackDialog(row._id)}
      >
       <span className="svg-icon svg-icon-lg svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </>
  );
}
