// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rapportcategories/rapportcategoriesActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../RapportcategoriesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useRapportcategoriesUIContext } from "../RapportcategoriesUIContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function RapportcategoriesTable() {
  // Rapportcategories UI Context
  const rapportcategoriesUIContext = useRapportcategoriesUIContext();
  const rapportcategoriesUIProps = useMemo(() => {
    return {
      ids: rapportcategoriesUIContext.ids,
      setIds: rapportcategoriesUIContext.setIds,
      queryParams: rapportcategoriesUIContext.queryParams,
      setQueryParams: rapportcategoriesUIContext.setQueryParams,
      openEditRapportcategoryDialog:
        rapportcategoriesUIContext.openEditRapportcategoryDialog,
      openDeleteRapportcategoryDialog:
        rapportcategoriesUIContext.openDeleteRapportcategoryDialog,
      openAddQuestionsToRapportcategoryDialog:
        rapportcategoriesUIContext.openAddQuestionsToRapportcategoryDialog,
      openFetchRapportcategoriesDetailsDialog:
        rapportcategoriesUIContext.openFetchRapportcategoriesDetailsDialog,
    };
  }, [rapportcategoriesUIContext]);

  // Getting curret state of rapportcategories list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.rapportcategories }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Rapportcategories Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    rapportcategoriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(
      actions.fetchRapportcategories(rapportcategoriesUIProps.queryParams)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rapportcategoriesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: false,
      formatter: (cell) => {
        return (
          <div>
            <CopyToClipboard
              text={cell}
              onCopy={() => toast.success("ID Copied to Clipboard")}
            >
              <button className="text-primary font-bold">_id</button>
            </CopyToClipboard>
          </div>
        );
      },
    },
    {
      dataField: "category_name",
      text: "Nom de CATÉGORIE",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "priority",
      text: "PRIORITÉ",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditRapportcategoryDialog:
          rapportcategoriesUIProps.openEditRapportcategoryDialog,
        openAddQuestionsToRapportcategoryDialog:
          rapportcategoriesUIProps.openAddQuestionsToRapportcategoryDialog,
        openDeleteRapportcategoryDialog:
          rapportcategoriesUIProps.openDeleteRapportcategoryDialog,
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
    sizePerPage: rapportcategoriesUIProps.queryParams.pageSize,
    page: rapportcategoriesUIProps.queryParams.pageNumber,
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
                  rapportcategoriesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: rapportcategoriesUIProps.ids,
                  setIds: rapportcategoriesUIProps.setIds,
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
