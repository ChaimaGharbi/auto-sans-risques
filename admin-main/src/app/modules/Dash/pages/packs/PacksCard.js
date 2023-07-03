import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { PacksFilter } from "./packs-filter/PacksFilter";
import { PacksTable } from "./packs-table/PacksTable";
import { PacksGrouping } from "./packs-grouping/PacksGrouping";
import { usePacksUIContext } from "./PacksUIContext";

export function PacksCard() {
  const packsUIContext = usePacksUIContext();
  const packsUIProps = useMemo(() => {
    return {
      ids: packsUIContext.ids,
      newPackButtonClick: packsUIContext.newPackButtonClick,
    };
  }, [packsUIContext]);

  return (
    <Card>
      <CardHeader title="Packs">
      <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={packsUIProps.newPackButtonClick}
          >
            Nouveau Pack
          </button>
        </CardHeaderToolbar>
        </CardHeader>

      <CardBody>
        <PacksFilter />
        {packsUIProps.ids.length > 0 && <PacksGrouping />}
        <PacksTable />
      </CardBody>
    </Card>
  );
}
