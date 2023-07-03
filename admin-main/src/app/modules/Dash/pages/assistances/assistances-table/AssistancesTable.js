// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/assistances/assistancesActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../AssistancesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useAssistancesUIContext } from "../AssistancesUIContext";

export function AssistancesTable() {
  // Assistances UI Context
  const assistancesUIContext = useAssistancesUIContext();
  const assistancesUIProps = useMemo(() => {
    return {
      ids: assistancesUIContext.ids,
      setIds: assistancesUIContext.setIds,
      queryParams: assistancesUIContext.queryParams,
      setQueryParams: assistancesUIContext.setQueryParams,
      openEditAssistanceDialog: assistancesUIContext.openEditAssistanceDialog,
      openDeleteAssistanceDialog: assistancesUIContext.openDeleteAssistanceDialog,
      openFetchAssistancesDetailsDialog: assistancesUIContext.openFetchAssistancesDetailsDialog
    };
  }, [assistancesUIContext]);

  // Getting curret state of assistances list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.assistances }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Assistances Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    assistancesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAssistances(assistancesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistancesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "tel",
      text: "Telephone",
      sort: false,
      style: {
        minWidth: "120px",
      },
    },  
    {
      dataField: "etat",
      text: "ETAT",
      sort: false,
      formatter: columnFormatters.StatusColumnFormatter,
      style: {
        minWidth: "120px",
      },
    }, 
    {
      dataField: "date",
      text: "Création Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: columnFormatters.DateColumnFormatter,
      style: {
        minWidth: "120px",
      },
    },  
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: assistancesUIProps.queryParams.pageSize,
    page: assistancesUIProps.queryParams.pageNumber,
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
                  assistancesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: assistancesUIProps.ids,
                  setIds: assistancesUIProps.setIds,
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
