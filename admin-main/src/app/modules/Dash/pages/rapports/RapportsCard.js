import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { RapportsFilter } from "./rapports-filter/RapportsFilter";
import { RapportsTable } from "./rapports-table/RapportsTable";
import { RapportsGrouping } from "./rapports-grouping/RapportsGrouping";
import { useRapportsUIContext } from "./RapportsUIContext";

export function RapportsCard() {
  const rapportsUIContext = useRapportsUIContext();
  const rapportsUIProps = useMemo(() => {
    return {
      ids: rapportsUIContext.ids,
      newRapportButtonClick: rapportsUIContext.newRapportButtonClick,
    };
  }, [rapportsUIContext]);

  return (
    <Card>
      <CardHeader title="Rapports">
      </CardHeader>
      <CardBody>
        <RapportsFilter />
        {rapportsUIProps.ids.length > 0 && <RapportsGrouping />}
        <RapportsTable />
      </CardBody>
    </Card>
  );
}
