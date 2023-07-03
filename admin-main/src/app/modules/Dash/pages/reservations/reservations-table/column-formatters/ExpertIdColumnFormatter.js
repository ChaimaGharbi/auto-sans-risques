import React from "react";
export function ExpertIdColumnFormatter(cellContent, row) {
  return (
    <>
      {row.expert[0]._id}
    </>
  );
}