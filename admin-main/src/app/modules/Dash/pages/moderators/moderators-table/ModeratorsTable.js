// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/moderators/moderatorsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../ModeratorsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useModeratorsUIContext } from "../ModeratorsUIContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function ModeratorsTable() {
  // ModeratorsUI Context
  const moderatorsUIContext = useModeratorsUIContext();
  const moderatorsUIProps = useMemo(() => {
    return {
      ids: moderatorsUIContext.ids,
      setIds: moderatorsUIContext.setIds,
      queryParams: moderatorsUIContext.queryParams,
      setQueryParams: moderatorsUIContext.setQueryParams,
      openEditModeratorDialog: moderatorsUIContext.openEditModeratorDialog,
      openDeleteModeratorDialog: moderatorsUIContext.openDeleteModeratorDialog,
      openFetchModeratorsDetailsDialog:
        moderatorsUIContext.openFetchModeratorsDetailsDialog,
    };
  }, [moderatorsUIContext]);

  // Getting curret state of moderators list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.moderators }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // ModeratorsRedux state
  const dispatch = useDispatch();
  const getValueActive = ({ ad, isActive }) => {
    ad = {
      ...ad,
      isActive,
    };
    
    dispatch(actions.updateModerator(ad));
  };
  useEffect(() => {
    // clear selections list
    moderatorsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchModerators(moderatorsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moderatorsUIProps.queryParams, dispatch]);
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
      text: "NOM & PRENOM",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "email",
      text: "EMAIL",
      formatter: (cellContent, row) => (
        <a href={`mailto:${row.email}`}>{row.email}</a>
      ),
      sort: false,
      style: {
        minWidth: "120px",
        maxWidth: "250px",
      },
    },
    {
      dataField: "tel",
      text: "TELEPHONE",
      formatter: (cellContent, row) => <a href={`tel:${row.tel}`}>{row.tel}</a>,
      sort: false,
      style: {
        minWidth: "120px",
        maxWidth: "250px",
      },
    },
    /*  {
      dataField: "img",
      text: "Image",
      sort: true,
      formatter: columnFormatters.TypeColumnFormatter,
      //sortCaret,
      style: {
        maxWidth: "85px",
      },
    }, */
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditModeratorDialog: moderatorsUIProps.openEditModeratorDialog,
        openDeleteModeratorDialog: moderatorsUIProps.openDeleteModeratorDialog,
        getValueActive,
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
    sizePerPage: moderatorsUIProps.queryParams.pageSize,
    page: moderatorsUIProps.queryParams.pageNumber,
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
                  moderatorsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: moderatorsUIProps.ids,
                  setIds: moderatorsUIProps.setIds,
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
