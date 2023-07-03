import React, { useMemo } from "react";
import { ArticlesFilter } from "./ModelsFilter";
import { ArticlesTable } from "./ModelsTable";
import { ArticlesLoadingDialog } from "./ModelsLoadingDialog";
import { ArticlesDeleteDialog } from "./ModelsDeleteDialog";
import { ArticleDeleteDialog } from "./ModelDeleteDialog";
import { ArticlesFetchDialog } from "./ModelsFetchDialog";
import { ArticlesGrouping } from "./ModelsGrouping";
import { ArticleEditDialog } from "./model-edit-dialog/ModelEditDialog";
import { useArticlesUIContext } from "./ModelsUIContext";

export function Articles() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return { ids: articlesUIContext.ids };
  }, [articlesUIContext]);

  return (
    <>
      <ArticlesLoadingDialog />
      <ArticleEditDialog />
      <ArticleDeleteDialog />
      <ArticlesDeleteDialog />
      <ArticlesFetchDialog />
      <div className="form margin-b-30">
        <ArticlesFilter />
        {articlesUIProps.ids.length > 0 && <ArticlesGrouping />}
      </div>
      <ArticlesTable />
    </>
  );
}
