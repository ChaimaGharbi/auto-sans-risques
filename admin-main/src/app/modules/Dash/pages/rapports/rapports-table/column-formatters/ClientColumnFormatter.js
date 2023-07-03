import React from "react";

export function ClientColumnFormatter(cellContent, row) {
  
  return <>{row?.client[0]?.fullName}</>;
}
