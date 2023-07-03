import React, { useMemo } from "react";
import { ArticlesFilter } from "./ArticlesFilter";
import { ArticlesTable } from "./ArticlesTable";
import { ArticlesLoadingDialog } from "./ArticlesLoadingDialog";
import { ArticlesDeleteDialog } from "./ArticlesDeleteDialog";
import { ArticleDeleteDialog } from "./ArticleDeleteDialog";
import { ArticlesFetchDialog } from "./ArticlesFetchDialog";
import { ArticlesGrouping } from "./ArticlesGrouping";
import { ArticleEditDialog } from "./article-edit-dialog/ArticleEditDialog";
import { useArticlesUIContext } from "./ArticlesUIContext";

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
