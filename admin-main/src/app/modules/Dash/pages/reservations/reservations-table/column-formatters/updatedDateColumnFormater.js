import React from "react";

export function UpdateDateColumnFormatter(cellContent, row) {
  return (
    <>
      {new Date(row.updatedAt? row.updatedAt: row.date).toLocaleString()}
    </>
  );
}
