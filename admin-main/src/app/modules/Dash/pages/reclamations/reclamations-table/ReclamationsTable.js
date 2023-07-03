// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/reclamations/reclamationsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ReclamationsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useReclamationsUIContext } from "../ReclamationsUIContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function ReclamationsTable() {
  // Reclamations UI Context
  const reclamationsUIContext = useReclamationsUIContext();
  const reclamationsUIProps = useMemo(() => {
    return {
      ids: reclamationsUIContext.ids,
      setIds: reclamationsUIContext.setIds,
      queryParams: reclamationsUIContext.queryParams,
      setQueryParams: reclamationsUIContext.setQueryParams,
      openFetchReclamationsDetailsDialog:
        reclamationsUIContext.openFetchReclamationsDetailsDialog,
    };
  }, [reclamationsUIContext]);

  // Getting curret state of reclamations list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.reclamations }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Reclamations Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    reclamationsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchReclamations(reclamationsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reclamationsUIProps.queryParams, dispatch]);
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
      dataField: "fullName",
      text: "Réclameur",
      sort: false,
      style: {
        minWidth: "130px",
        maxWidth: "250px",
      },
    },
    {
      dataField: "email",
      text: "Email",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "tel",
      text: "Telephone",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "title",
      text: "Reclamation Sujet",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "reservationId",
      text: "Réservation ID",
      sort: false,
      formatter: (cell) => {
        return (
          <div>
            <CopyToClipboard
              text={cell}
              onCopy={() => toast.success("ID Copied to Clipboard")}
            >
              <button className="text-primary font-bold">Copy ID</button>
            </CopyToClipboard>
          </div>
        );
      },
    },

    {
      dataField: "date",
      text: "Création Date",
      sort: false,
      formatter: columnFormatters.DateColumnFormatter,
      style: {
        minWidth: "120px",
      },
    },
    {
      dataField: "etat",
      text: "ETAT",
      sort: false,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openFetchReclamationsDetailsDialog:
          reclamationsUIProps.openFetchReclamationsDetailsDialog,
      },
      classes: "text-center pr-0",
      headerClasses: "text-right pr-3",
      style: {
        maxWidth: "20px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: reclamationsUIProps.queryParams.pageSize,
    page: reclamationsUIProps.queryParams.pageNumber,
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
                  reclamationsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: reclamationsUIProps.ids,
                  setIds: reclamationsUIProps.setIds,
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
