// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ads/adsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../AdsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useAdsUIContext } from "../AdsUIContext";

export function AdsTable() {
  // AdsUI Context
  const adsUIContext = useAdsUIContext();
  const adsUIProps = useMemo(() => {
    return {
      ids: adsUIContext.ids,
      setIds: adsUIContext.setIds,
      queryParams: adsUIContext.queryParams,
      setQueryParams: adsUIContext.setQueryParams,
      openEditAdDialog: adsUIContext.openEditAdDialog,
      openDeleteAdDialog: adsUIContext.openDeleteAdDialog,
      openFetchAdsDetailsDialog: adsUIContext.openFetchAdsDetailsDialog,
    };
  }, [adsUIContext]);

  // Getting curret state of ads list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.ads }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // AdsRedux state
  const dispatch = useDispatch();
  const getValueActive = ({ ad, isActive }) => {
    ad = {
      ...ad,
      isActive,
    };
    
    dispatch(actions.updateAd(ad));
  };
  useEffect(() => {
    // clear selections list
    adsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAds(adsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "_id",
      text: "ID",
      sort: false,
    },
    {
      dataField: "title",
      text: "TITLE",
      sort: false,
      style: {
        maxWidth: "250px",
      },
    },
    {
      dataField: "body",
      text: "CONTENT",
      //formatter: columnFormatters.TypeColumnFormatter,
      sort: false,
      style: {
        minWidth: "120px",
        maxWidth: "250px",
      },
    },
    {
      dataField: "url",
      text: "URL",
      formatter: (cellContent, row) => (
        <a href={row.url} target="_blank">
          {row.url}
        </a>
      ),
      sort: false,
      style: {
        minWidth: "120px",
        maxWidth: "250px",
      },
    },
    {
      dataField: "img",
      text: "Image",
      sort: true,
      formatter: columnFormatters.TypeColumnFormatter,
      //sortCaret,
      style: {
        maxWidth: "85px",
      },
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAdDialog: adsUIProps.openEditAdDialog,
        openDeleteAdDialog: adsUIProps.openDeleteAdDialog,
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
    sizePerPage: adsUIProps.queryParams.pageSize,
    page: adsUIProps.queryParams.pageNumber,
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
                onTableChange={getHandlerTableChange(adsUIProps.setQueryParams)}
                selectRow={getSelectRow({
                  entities,
                  ids: adsUIProps.ids,
                  setIds: adsUIProps.setIds,
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
