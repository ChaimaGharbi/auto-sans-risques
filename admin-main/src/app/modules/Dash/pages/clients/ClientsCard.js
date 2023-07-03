import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ClientsFilter } from "./clients-filter/ClientsFilter";
import { ClientsTable } from "./clients-table/ClientsTable";
import { ClientsGrouping } from "./clients-grouping/ClientsGrouping";
import { useClientsUIContext } from "./ClientsUIContext";

export function ClientsCard() {
  const clientsUIContext = useClientsUIContext();
  const clientsUIProps = useMemo(() => {
    return {
      ids: clientsUIContext.ids,
      newClientButtonClick: clientsUIContext.newClientButtonClick,
    };
  }, [clientsUIContext]);

  return (
    <Card>
      <CardHeader title="Clients">
      </CardHeader>
      <CardBody>
        <ClientsFilter />
        {clientsUIProps.ids.length > 0 && <ClientsGrouping />}
        <ClientsTable />
      </CardBody>
    </Card>
  );
}
