// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as actions from "../../../_redux/models/modelsActions";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import * as uiHelpers from "./ModelsUIHelper";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import { useArticlesUIContext } from "./ModelsUIContext";
import { IconColumnFormatter } from "./column-formatters/IconColumnFormatter";
import { TypeColumnFormatter } from "../marks-table/column-formatters";

export function ArticlesTable() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return {
      ids: articlesUIContext.ids,
      setIds: articlesUIContext.setIds,
      queryParams: articlesUIContext.queryParams,
      setQueryParams: articlesUIContext.setQueryParams,
      categoryId: articlesUIContext.categoryId,
      openEditArticleDialog: articlesUIContext.openEditArticleDialog,
      openAddItemstoArticlePage: articlesUIContext.openAddItemstoArticlePage,
      opendeleteModelDialog: articlesUIContext.opendeleteModelDialog,
    };
  }, [articlesUIContext]);

  // Getting curret state of categorys list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.models }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    articlesUIProps.setIds([]);
    dispatch(
      actions.fetchModels(
        articlesUIProps.queryParams,
        articlesUIProps.categoryId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesUIProps.queryParams, dispatch, articlesUIProps.categoryId]);
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "model",
      sort: true,
    },
    /* {
      dataField: "articleImg",
      text: "Image d'article",
      formatter: IconColumnFormatter,
    }, */
    /* {
      dataField: "created_At",
      text: "Date de Création",
      sort: true,
      sortCaret: sortCaret,
      formatter: TypeColumnFormatter,
    },
    {
      dataField: "priority",
      text: "PRIORITÉ",
      sort: true,
      sortCaret: sortCaret,
    }, */
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditArticleDialog: articlesUIProps.openEditArticleDialog,
        opendeleteModelDialog: articlesUIProps.opendeleteModelDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: articlesUIProps.queryParams.pageSize,
    page: articlesUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center"
                bordered={false}
                bootstrap4
                remote
                keyField="_id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  articlesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: articlesUIProps.ids,
                  setIds: articlesUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
