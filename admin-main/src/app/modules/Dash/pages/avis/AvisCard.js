import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { AvisFilter } from "./avis-filter/AvisFilter";
import { AvisTable } from "./avis-table/AvisTable";
import { AvisGrouping } from "./avis-grouping/AvisGrouping";
import { useAvisUIContext } from "./AvisUIContext";

export function AvisCard() {
  const avisUIContext = useAvisUIContext();
  const avisUIProps = useMemo(() => {
    return {
      ids: avisUIContext.ids,
      newAvisButtonClick: avisUIContext.newAvisButtonClick,
    };
  }, [avisUIContext]);

  return (
    <Card>
      <CardHeader title="Avis">
      </CardHeader>
      <CardBody>
        <AvisFilter />
        {avisUIProps.ids.length > 0 && <AvisGrouping />}
        <AvisTable />
      </CardBody>
    </Card>
  );
}
