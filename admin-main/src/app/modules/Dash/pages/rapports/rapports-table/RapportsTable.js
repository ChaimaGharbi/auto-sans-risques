// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rapports/rapportsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../RapportsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useRapportsUIContext } from "../RapportsUIContext";

import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function RapportsTable() {
  // Rapports UI Context
  const rapportsUIContext = useRapportsUIContext();
  const rapportsUIProps = useMemo(() => {
    return {
      ids: rapportsUIContext.ids,
      setIds: rapportsUIContext.setIds,
      queryParams: rapportsUIContext.queryParams,
      setQueryParams: rapportsUIContext.setQueryParams,
      openEditRapportDialog: rapportsUIContext.openEditRapportDialog,
      openDeleteRapportDialog: rapportsUIContext.openDeleteRapportDialog,
      openFetchRapportsDetailsDialog:
        rapportsUIContext.openFetchRapportsDetailsDialog,
    };
  }, [rapportsUIContext]);

  // Getting curret state of rapports list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.rapports }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Rapports Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    rapportsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchRapports(rapportsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rapportsUIProps.queryParams, dispatch]);
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
      text: "EXPERT",
      sort: false,
      formatter: (_, { expert, link }) => {
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
      dataField: "typeCar",
      text: "VOITURE",
      sort: false,
      formatter: columnFormatters.CarColumnFormatter,
      style: {
        maxWidth: "250px",
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
    // {
    //   dataField: "updatedAt",
    //   text: "Dernier Mise a jour",
    //   sort: false,
    //   formatter: columnFormatters.UpdateDateColumnFormatter,
    //   style: {
    //     minWidth: "120px",
    //   },
    // },
    {
      dataField: "link",
      text: "PDF",
      sort: false,
      formatter: columnFormatters.LinkColumnFormatter,
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: rapportsUIProps.queryParams.pageSize,
    page: rapportsUIProps.queryParams.pageNumber,
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
                  rapportsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: rapportsUIProps.ids,
                  setIds: rapportsUIProps.setIds,
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
