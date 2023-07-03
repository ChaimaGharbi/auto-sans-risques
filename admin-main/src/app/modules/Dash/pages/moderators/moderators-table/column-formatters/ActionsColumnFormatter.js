// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import * as actions from "../../../../_redux/moderators/moderatorsActions";

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditModeratorDialog, openDeleteModeratorDialog, getValueActive }
) {
  //const dispatch = useDispatch();
  /*  const { currentState } = useSelector(
    (state) => ({ currentState: state.moderators }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState; */
  return (
    <div className="d-flex justify-content-end">
      <OverlayTrigger
        overlay={
          <Tooltip id="customers-delete-tooltip">Supprimer Moderator</Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm mx-1"
          onClick={() => openDeleteModeratorDialog(row._id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Navigation/Close.svg")} />
          </span>
        </a>
      </OverlayTrigger>
      <OverlayTrigger
        overlay={
          <Tooltip id="customers-delete-tooltip">Modifier Moderator</Tooltip>
        }
      >
        <a
          className="btn btn-icon btn-light btn-hover-info btn-sm mx-1"
          onClick={() => openEditModeratorDialog(row._id)}
        >
          <span className="svg-icon svg-icon-lg svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>
      {/*  <OverlayTrigger overlay={<Tooltip>Activer Moderator</Tooltip>}>
        <div className="mx-1">
          <BootstrapSwitchButton
            onlabel=" "
            offlabel=" "
            checked={row.isActive}
            onstyle="success"
            offstyle="outline-danger"
            onChange={(checked) => {
              // let newAd = row;
              //newAd = { ...newAd, isActive: checked }; 
              getValueActive({ ad: row, isActive: checked });
              //setFieldValue("isActive", checked);
              // dispatch(actions.updateModerator(ad));
            }}
          />
        </div>
      </OverlayTrigger> */}
    </div>
  );
}
