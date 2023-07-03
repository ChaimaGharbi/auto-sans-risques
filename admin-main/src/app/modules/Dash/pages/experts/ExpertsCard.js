import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ExpertsFilter } from "./experts-filter/ExpertsFilter";
import { ExpertsTable } from "./experts-table/ExpertsTable";
import { ExpertsGrouping } from "./experts-grouping/ExpertsGrouping";
import { useExpertsUIContext } from "./ExpertsUIContext";

export function ExpertsCard() {
  const expertsUIContext = useExpertsUIContext();
  const expertsUIProps = useMemo(() => {
    return {
      ids: expertsUIContext.ids,
      newExpertButtonClick: expertsUIContext.newExpertButtonClick,
    };
  }, [expertsUIContext]);

  return (
    <Card>
      <CardHeader title="Experts">
      </CardHeader>
      <CardBody>
        <ExpertsFilter />
        {expertsUIProps.ids.length > 0 && <ExpertsGrouping />}
        <ExpertsTable />
      </CardBody>
    </Card>
  );
}
