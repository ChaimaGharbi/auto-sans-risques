import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { AdsFilter } from "./ads-filter/AdsFilter";
import { AdsTable } from "./ads-table/AdsTable";
import { AdsGrouping } from "./ads-grouping/AdsGrouping";
import { useAdsUIContext } from "./AdsUIContext";

export function AdsCard() {
  const adsUIContext = useAdsUIContext();
  const adsUIProps = useMemo(() => {
    return {
      ids: adsUIContext.ids,
      newAdButtonClick: adsUIContext.newAdButtonClick,
    };
  }, [adsUIContext]);

  return (
    <Card>
      <CardHeader title="Banniéres pulicitaires">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={adsUIProps.newAdButtonClick}
          >
            Nouvelle Banniéres
          </button>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
        <AdsFilter />
        {adsUIProps.ids.length > 0 && <AdsGrouping />}
        <AdsTable />
      </CardBody>
    </Card>
  );
}
