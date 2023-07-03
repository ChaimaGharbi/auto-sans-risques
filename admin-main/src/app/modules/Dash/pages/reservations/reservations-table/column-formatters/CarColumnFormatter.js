import React from "react";

export function CarColumnFormatter(cellContent, row) {
  return (
    <>
      {row.reservation[0].typeCar}
    </>
  );
}