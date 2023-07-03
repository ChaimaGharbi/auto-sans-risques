// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/reservations/reservationsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ReservationsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useReservationsUIContext } from "../ReservationsContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function ReservationsTable() {
  // Reservations UI Context
  const reservationsUIContext = useReservationsUIContext();
  const reservationsUIProps = useMemo(() => {
    return {
      ids: reservationsUIContext.ids,
      setIds: reservationsUIContext.setIds,
      queryParams: reservationsUIContext.queryParams,
      setQueryParams: reservationsUIContext.setQueryParams,
      openEditReservationDialog:
        reservationsUIContext.openEditReservationDialog,
      openDeleteReservationDialog:
        reservationsUIContext.openDeleteReservationDialog,
      openFetchReservationsDetailsDialog:
        reservationsUIContext.openFetchReservationsDetailsDialog,
    };
  }, [reservationsUIContext]);

  // Getting curret state of reservations list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.reservations }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Reservations Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    reservationsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchReservations(reservationsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservationsUIProps.queryParams, dispatch]);
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
      dataField: "expert",
      text: "EXPERT",
      sort: false,
      formatter: (_, { expert }) => {
        return (
          <div>
            <CopyToClipboard
              text={expert[0]._id}
              onCopy={() => toast.success("Expert ID Copied to Clipboard")}
            >
              <button className="text-primary font-bold">
                {expert[0].fullName}
              </button>
            </CopyToClipboard>
          </div>
        );
      },
    },
    {
      dataField: "client",
      text: "CLIENT",
      sort: false,
      formatter: (_, { client }) => {
        return (
          <div>
            <CopyToClipboard
              text={client[0]._id}
              onCopy={() => toast.success("Client ID Copied to Clipboard")}
            >
              <button className="text-primary font-bold">
                {client[0].fullName}
              </button>
            </CopyToClipboard>
          </div>
        );
      },
    },
    {
      dataField: "fullName",
      text: "FULL NAME",
      sort: false,
      style: {
        minWidth: "130px",
        maxWidth: "250px",
      },
    },
    {
      dataField: "phone",
      text: "Telephone client",
      sort: false,
      style: {
        minWidth: "70px",
        maxWidth: "250px",
      },
    },

    {
      dataField: "status",
      text: "ETAT",
      sort: false,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "date",
      text: "Création Date",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: columnFormatters.DateColumnFormatter,
      style: {
        minWidth: "140px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: reservationsUIProps.queryParams.pageSize,
    page: reservationsUIProps.queryParams.pageNumber,
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
                  reservationsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: reservationsUIProps.ids,
                  setIds: reservationsUIProps.setIds,
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
