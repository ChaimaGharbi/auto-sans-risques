import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ModeratorsFilter } from "./moderators-filter/ModeratorsFilter";
import { ModeratorsTable } from "./moderators-table/ModeratorsTable";
import { ModeratorsGrouping } from "./moderators-grouping/ModeratorsGrouping";
import { useModeratorsUIContext } from "./ModeratorsUIContext";

export function ModeratorsCard() {
  const moderatorsUIContext = useModeratorsUIContext();
  const moderatorsUIProps = useMemo(() => {
    return {
      ids: moderatorsUIContext.ids,
      newModeratorButtonClick: moderatorsUIContext.newModeratorButtonClick,
    };
  }, [moderatorsUIContext]);

  return (
    <Card>
      <CardHeader title="Moderators">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={moderatorsUIProps.newModeratorButtonClick}
          >
            Nouveau Moderator
          </button>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
        <ModeratorsFilter />
        {moderatorsUIProps.ids.length > 0 && <ModeratorsGrouping />}
        <ModeratorsTable />
      </CardBody>
    </Card>
  );
}
