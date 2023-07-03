// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/packs/packsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../PacksUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { usePacksUIContext } from "../PacksUIContext";

export function PacksTable() {
  // Packs UI Context
  const packsUIContext = usePacksUIContext();
  const packsUIProps = useMemo(() => {
    return {
      ids: packsUIContext.ids,
      setIds: packsUIContext.setIds,
      queryParams: packsUIContext.queryParams,
      setQueryParams: packsUIContext.setQueryParams,
      openEditPackDialog: packsUIContext.openEditPackDialog,
      openDeletePackDialog: packsUIContext.openDeletePackDialog,
      openFetchPacksDetailsDialog: packsUIContext.openFetchPacksDetailsDialog
    };
  }, [packsUIContext]);

  // Getting curret state of packs list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.packs }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Packs Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    packsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchPacks(packsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: false,
    },
    {
      dataField: "nb_missions",
      text: "NB_Missions",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "prix",
      text: "PRIX",
      formatter: columnFormatters.TypeColumnFormatter,
      sort: false,
      style: {
        minWidth: "120px",
        maxWidth: "250px",
      },
    },
    {
      dataField: "priority",
      text: "Priority",
      sort: true,
      sortCaret,

      style: {
        maxWidth: "85px",
      },
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditPackDialog: packsUIProps.openEditPackDialog,
        openDeletePackDialog: packsUIProps.openDeletePackDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: packsUIProps.queryParams.pageSize,
    page: packsUIProps.queryParams.pageNumber,
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
                  packsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: packsUIProps.ids,
                  setIds: packsUIProps.setIds,
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
