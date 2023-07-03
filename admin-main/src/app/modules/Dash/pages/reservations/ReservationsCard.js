import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ReservationsFilter } from "./reservations-filter/ReservationsFilter";
import { ReservationsTable } from "./reservations-table/ReservationsTable";
import { ReservationsGrouping } from "./reservations-grouping/ReservationsGrouping";
import { useReservationsUIContext } from "./ReservationsContext";

export function ReservationsCard() {
  const reservationsUIContext = useReservationsUIContext();
  const reservationsUIProps = useMemo(() => {
    return {
      ids: reservationsUIContext.ids,
      newReservationButtonClick: reservationsUIContext.newReservationButtonClick,
    };
  }, [reservationsUIContext]);

  return (
    <Card>
      <CardHeader title="Missions">
      </CardHeader>
      <CardBody>
        <ReservationsFilter />
        {reservationsUIProps.ids.length > 0 && <ReservationsGrouping />}
        <ReservationsTable />
      </CardBody>
    </Card>
  );
}
