// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/experts/expertsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ExpertsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useExpertsUIContext } from "../ExpertsUIContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function ExpertsTable() {
  // Experts UI Context
  const expertsUIContext = useExpertsUIContext();
  const expertsUIProps = useMemo(() => {
    return {
      ids: expertsUIContext.ids,
      setIds: expertsUIContext.setIds,
      queryParams: expertsUIContext.queryParams,
      setQueryParams: expertsUIContext.setQueryParams,
      openEditExpertDialog: expertsUIContext.openEditExpertDialog,
      openFetchExpertDetailsDialog:
        expertsUIContext.openFetchExpertDetailsDialog,
    };
  }, [expertsUIContext]);

  // Getting curret state of experts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.experts }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Experts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    expertsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchExperts(expertsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertsUIProps.queryParams, dispatch]);
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
      dataField: "credit",
      text: "CREDIT",
      sort: false,
      style: {
        maxWidth: "85px",
      },
    },
    {
      dataField: "nb_missions",
      text: "Nb Missions",
      sort: true,
      headerSortingClasses,
      sortCaret: sortCaret,
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
    // {
    //   dataField: "createdAt",
    //   text: "Création Date",
    //   sort: true,
    //   headerSortingClasses,
    //   sortCaret: sortCaret,
    //   formatter: columnFormatters.TypeColumnFormatter,
    // },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditExpertDialog: expertsUIProps.openEditExpertDialog,
        openFetchExpertDetailsDialog:
          expertsUIProps.openFetchExpertDetailsDialog,
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
    sizePerPage: expertsUIProps.queryParams.pageSize,
    page: expertsUIProps.queryParams.pageNumber,
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
                  expertsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: expertsUIProps.ids,
                  setIds: expertsUIProps.setIds,
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
