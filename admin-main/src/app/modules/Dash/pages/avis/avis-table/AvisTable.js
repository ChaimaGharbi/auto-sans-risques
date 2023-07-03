// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/avis/avisActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../AvisUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useAvisUIContext } from "../AvisUIContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function AvisTable() {
  // Avis UI Context
  const avisUIContext = useAvisUIContext();
  const avisUIProps = useMemo(() => {
    return {
      ids: avisUIContext.ids,
      setIds: avisUIContext.setIds,
      queryParams: avisUIContext.queryParams,
      setQueryParams: avisUIContext.setQueryParams,
      openFetchAvisDetailsDialog: avisUIContext.openFetchAvisDetailsDialog,
      openDeleteAvisDialog: avisUIContext.openDeleteAvisDialog,
    };
  }, [avisUIContext]);

  // Getting curret state of avis list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.avis }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Avis Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    avisUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAvis(avisUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avisUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: true,
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
      dataField: "note",
      text: "NOTE",
      sort: false,
      formatter: columnFormatters.NoteColumnFormatter,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "commentaire",
      text: "Commentaire",
      sort: false,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openFetchAvisDetailsDialog: avisUIProps.openFetchAvisDetailsDialog,
        openDeleteAvisDialog: avisUIProps.openDeleteAvisDialog,
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
    sizePerPage: avisUIProps.queryParams.pageSize,
    page: avisUIProps.queryParams.pageNumber,
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
                  avisUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: avisUIProps.ids,
                  setIds: avisUIProps.setIds,
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
