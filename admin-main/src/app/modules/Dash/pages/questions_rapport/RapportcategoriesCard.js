import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { RapportcategoriesFilter } from "./rapportcategories-filter/RapportcategoriesFilter";
import { RapportcategoriesTable } from "./rapportcategories-table/RapportcategoriesTable";
import { RapportcategoriesGrouping } from "./rapportcategories-grouping/RapportcategoriesGrouping";
import { useRapportcategoriesUIContext } from "./RapportcategoriesUIContext";

export function RapportcategoriesCard() {
  const rapportcategoriesUIContext = useRapportcategoriesUIContext();
  const rapportcategoriesUIProps = useMemo(() => {
    return {
      ids: rapportcategoriesUIContext.ids,
      newRapportcategoryButtonClick: rapportcategoriesUIContext.newRapportcategoryButtonClick,
    };
  }, [rapportcategoriesUIContext]);

  return (
    <Card>
      <CardHeader title="Rapport Questions catégories">
      <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={rapportcategoriesUIProps.newRapportcategoryButtonClick}
          >
            Nouvelle catégorie
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RapportcategoriesFilter />
        {rapportcategoriesUIProps.ids.length > 0 && <RapportcategoriesGrouping />}
        <RapportcategoriesTable />
      </CardBody>
    </Card>
  );
}
