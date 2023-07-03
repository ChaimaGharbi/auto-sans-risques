import React from "react";
import ReactCountryFlag from "react-country-flag";

export function GeoColumnFormatter(cellContent, row) {
  return (
    <>
      <ReactCountryFlag
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
        title={row.geo}
        countryCode={row.geo}
      />
    </>
  );
}
