import React from "react";
export function ClientIdColumnFormatter(cellContent, row) {
  return <>{row?.client[0]?._id}</>;
}
