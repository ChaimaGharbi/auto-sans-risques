// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/marks/marksActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../MarksUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCategoriesUIContext } from "../MarksUIContext";

export function CategoriesTable() {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      setIds: categoriesUIContext.setIds,
      queryParams: categoriesUIContext.queryParams,
      setQueryParams: categoriesUIContext.setQueryParams,
      openEditCategoryDialog: categoriesUIContext.openEditCategoryDialog,
      opendeleteMarkDialog: categoriesUIContext.opendeleteMarkDialog,
      openAddArticlesToCategoryDialog:
        categoriesUIContext.openAddArticlesToCategoryDialog,
      openfetchMarksDetailsDialog:
        categoriesUIContext.openfetchMarksDetailsDialog,
    };
  }, [categoriesUIContext]);

  // Getting curret state of categories list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.marks }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Categories Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    categoriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchMarks(categoriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: false,
    },
    {
      dataField: "name",
      text: "Nom de MARQUE",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    /*  {
      dataField: "priority",
      text: "PRIORITÉ",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    }, */
    /* {
      dataField: "created_At",
      text: "Date de creation",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.TypeColumnFormatter,
    }, */
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCategoryDialog: categoriesUIProps.openEditCategoryDialog,
        openAddArticlesToCategoryDialog:
          categoriesUIProps.openAddArticlesToCategoryDialog,
        opendeleteMarkDialog: categoriesUIProps.opendeleteMarkDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "150px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: categoriesUIProps.queryParams.pageSize,
    page: categoriesUIProps.queryParams.pageNumber,
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
                bordered={false}
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                remote
                keyField="_id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  categoriesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: categoriesUIProps.ids,
                  setIds: categoriesUIProps.setIds,
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
