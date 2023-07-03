// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as actions from "../../../_redux/questions/questionsActions";
import { ActionsColumnFormatter } from "./column-formatters/ActionsColumnFormatter";
import * as uiHelpers from "./QuestionsUIHelper";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import { useQuestionsUIContext } from "./QuestionsUIContext";
import { ChoicesColumnFormatter } from "./column-formatters/IconColumnFormatter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export function QuestionsTable() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      ids: questionsUIContext.ids,
      setIds: questionsUIContext.setIds,
      queryParams: questionsUIContext.queryParams,
      setQueryParams: questionsUIContext.setQueryParams,
      categoryId: questionsUIContext.categoryId,
      openEditQuestionDialog: questionsUIContext.openEditQuestionDialog,
      openAddItemstoQuestionPage: questionsUIContext.openAddItemstoQuestionPage,
      openDeleteQuestionDialog: questionsUIContext.openDeleteQuestionDialog,
    };
  }, [questionsUIContext]);

  // Getting curret state of questions_rapportcategorys list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.questions }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    questionsUIProps.setIds([]);
    dispatch(
      actions.fetchQuestions(
        questionsUIProps.queryParams,
        questionsUIProps.categoryId
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsUIProps.queryParams, dispatch, questionsUIProps.categoryId]);
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
      dataField: "question",
      text: "Question",
      sort: false,
    },
    {
      dataField: "typeInput",
      text: "Type du champ",
      sort: false,
    },
    {
      dataField: "choices",
      text: "Choix",
      sort: false,
      formatter: ChoicesColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditQuestionDialog: questionsUIProps.openEditQuestionDialog,
        openDeleteQuestionDialog: questionsUIProps.openDeleteQuestionDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: questionsUIProps.queryParams.pageSize,
    page: questionsUIProps.queryParams.pageNumber,
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
                classes="table table-head-custom table-vertical-center"
                bordered={false}
                bootstrap4
                remote
                keyField="_id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  questionsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: questionsUIProps.ids,
                  setIds: questionsUIProps.setIds,
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
