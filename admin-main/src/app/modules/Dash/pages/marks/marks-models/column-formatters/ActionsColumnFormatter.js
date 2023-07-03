/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditArticleDialog, opendeleteModelDialog, openAddItemstoArticlePage }
) => (
  <>
    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="customers-edit-tooltip">Modifier model</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditArticleDialog(row._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
    </OverlayTrigger>

    <> </>
    <OverlayTrigger
      overlay={<Tooltip id="customers-delete-tooltip">Supprimer model</Tooltip>}
    >
      <a
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => opendeleteModelDialog(row._id)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
        </span>
      </a>
    </OverlayTrigger>
  </>
);
