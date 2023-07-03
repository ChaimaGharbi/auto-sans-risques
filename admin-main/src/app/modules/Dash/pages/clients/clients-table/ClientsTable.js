// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/clients/clientsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ClientsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useClientsUIContext } from "../ClientsUIContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function ClientsTable() {
  // Clients UI Context
  const clientsUIContext = useClientsUIContext();
  const clientsUIProps = useMemo(() => {
    return {
      ids: clientsUIContext.ids,
      setIds: clientsUIContext.setIds,
      queryParams: clientsUIContext.queryParams,
      setQueryParams: clientsUIContext.setQueryParams,
      openEditClientDialog: clientsUIContext.openEditClientDialog,
    };
  }, [clientsUIContext]);

  // Getting curret state of clients list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.clients }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Clients Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    clientsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchClients(clientsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsUIProps.queryParams, dispatch]);
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
      dataField: "email",
      text: "EMAIL",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "fullName",
      text: "Nom & Prenom",
      sort: false,
      style: {
        minWidth: "120px",
        maxWidth: "250px",
      },
    },
    {
      dataField: "adresse",
      text: "Adresse",
      sort: false,
    },
    {
      dataField: "tel",
      text: "Telephone",
      sort: false,
      style: {
        maxWidth: "85px",
      },
    },
    {
      dataField: "status",
      text: "STATUS",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: columnFormatters.StatusColumnFormatter,
      style: {
        maxWidth: "80px",
      },
    },

    {
      dataField: "isVerified",
      text: "Email Verification",
      sort: false,
      formatter: columnFormatters.StatusEmailColumnFormatter,
      style: {
        maxWidth: "80px",
      },
    },
    {
      dataField: "createdAt",
      text: "Création Date",
      sort: true,
      headerSortingClasses,
      sortCaret: sortCaret,
      formatter: columnFormatters.TypeColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditClientDialog: clientsUIProps.openEditClientDialog,
      },
      classes: "text-left pr-0",
      headerClasses: "text-left pr-3",
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
    sizePerPage: clientsUIProps.queryParams.pageSize,
    page: clientsUIProps.queryParams.pageNumber,
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
                  clientsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: clientsUIProps.ids,
                  setIds: clientsUIProps.setIds,
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
