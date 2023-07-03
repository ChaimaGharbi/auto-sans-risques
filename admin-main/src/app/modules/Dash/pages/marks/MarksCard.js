import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { CategoriesFilter } from "./marks-filter/MarksFilter";
import { CategoriesTable } from "./marks-table/MarksTable";
import { CategoriesGrouping } from "./marks-grouping/MarksGrouping";
import { useCategoriesUIContext } from "./MarksUIContext";

export function CategoriesCard() {
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      newCategoryButtonClick: categoriesUIContext.newCategoryButtonClick,
    };
  }, [categoriesUIContext]);

  return (
    <Card>
      <CardHeader title="Marques">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={categoriesUIProps.newCategoryButtonClick}
          >
            Nouvelle marque
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CategoriesFilter />
        {categoriesUIProps.ids.length > 0 && <CategoriesGrouping />}
        <CategoriesTable />
      </CardBody>
    </Card>
  );
}
