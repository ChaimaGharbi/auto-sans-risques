import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ReclamationsFilter } from "./reclamations-filter/ReclamationsFilter";
import { ReclamationsTable } from "./reclamations-table/ReclamationsTable";
import { ReclamationsGrouping } from "./reclamations-grouping/ReclamationsGrouping";
import { useReclamationsUIContext } from "./ReclamationsUIContext";

export function ReclamationsCard() {
  const reclamationsUIContext = useReclamationsUIContext();
  const reclamationsUIProps = useMemo(() => {
    return {
      ids: reclamationsUIContext.ids,
      newReclamationButtonClick: reclamationsUIContext.newReclamationButtonClick,
    };
  }, [reclamationsUIContext]);

  return (
    <Card>
      <CardHeader title="Reclamations">
      </CardHeader>
      <CardBody>
        <ReclamationsFilter />
        {reclamationsUIProps.ids.length > 0 && <ReclamationsGrouping />}
        <ReclamationsTable />
      </CardBody>
    </Card>
  );
}
