/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  {
    openEditQuestionDialog,
    openDeleteQuestionDialog,
    openAddItemstoQuestionPage,
  }
) => (
  <>
    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="customers-edit-tooltip">Modifier question</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditQuestionDialog(row._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <img src="/media/svg/icons/Communication/Write.svg" alt="Write" />
        </span>
      </a>
    </OverlayTrigger>

    <> </>
    <OverlayTrigger
      overlay={
        <Tooltip id="customers-delete-tooltip">Supprimer question</Tooltip>
      }
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeleteQuestionDialog(row._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <img src="/media/svg/icons/General/Trash.svg" alt="Trash" />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
