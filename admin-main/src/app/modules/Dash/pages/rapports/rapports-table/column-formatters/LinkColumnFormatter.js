import React from "react";
import ClockIcon from "./icons/ClockIcon";
import DownloadIcon from "./icons/DownloadIcon";
import ErrorIcon from "./icons/ErrorIcon";

export function LinkColumnFormatter(cellContent, row) {
  let x;

  if (row.etat === "en attente" || row.etat === "en cours") {
    x = <ClockIcon className="tw-h-6 tw-w-6 tw-text-purple-600" />;
  } else if (row.etat === "COMPLETEE" && row.link) {
    x = (
      <a target="_blank" rel="noopener noreferrer" href={row.link}>
        <DownloadIcon className="tw-h-6 tw-w-6 tw-text-blue-600" />
      </a>
    );
  } else if (row.etat === "échoué" || row.etat === "annulé") {
    x = <ErrorIcon className="tw-h-6 tw-w-6 tw-text-red-600" />;
  }
  return <>{x}</>;
}
