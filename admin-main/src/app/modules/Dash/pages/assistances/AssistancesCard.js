import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { AssistancesFilter } from "./assistances-filter/AssistancesFilter";
import { AssistancesTable } from "./assistances-table/AssistancesTable";
import { AssistancesGrouping } from "./assistances-grouping/AssistancesGrouping";
import { useAssistancesUIContext } from "./AssistancesUIContext";

export function AssistancesCard() {
  const assistancesUIContext = useAssistancesUIContext();
  const assistancesUIProps = useMemo(() => {
    return {
      ids: assistancesUIContext.ids,
      newAssistanceButtonClick: assistancesUIContext.newAssistanceButtonClick,
    };
  }, [assistancesUIContext]);

  return (
    <Card>
      <CardHeader title="Assistances">
      </CardHeader>
      <CardBody>
        <AssistancesFilter />
        {assistancesUIProps.ids.length > 0 && <AssistancesGrouping />}
        <AssistancesTable />
      </CardBody>
    </Card>
  );
}
