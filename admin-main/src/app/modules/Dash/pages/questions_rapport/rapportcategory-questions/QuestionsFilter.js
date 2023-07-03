import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useQuestionsUIContext } from "./QuestionsUIContext";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.question = searchText;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function QuestionsFilter() {
  // Questions UI Context
  const questionsUIContext = useQuestionsUIContext();
  const questionsUIProps = useMemo(() => {
    return {
      setQueryParams: questionsUIContext.setQueryParams,
      openNewQuestionDialog: questionsUIContext.openNewQuestionDialog,
      queryParams: questionsUIContext.queryParams,
    };
  }, [questionsUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(questionsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, questionsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      questionsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <div className="form-filtration">
        <div className="row align-items-center">
          <div className="col-md-2 margin-bottom-10-mobile">
            <Formik
              initialValues={{
                searchText: "",
              }}
              onSubmit={(values) => {
                applyFilter(values);
              }}
            >
              {({
                values,
                handleSubmit,
                handleBlur,
                handleChange,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="searchText"
                      placeholder="Search"
                      onBlur={handleBlur}
                      value={values.searchText}
                      onChange={(e) => {
                        setFieldValue("searchText", e.target.value);
                        handleSubmit();
                      }}
                    />
                    <small className="form-text text-muted">
                      <b>Chercher</b> par question
                    </small>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className="col-md-8 margin-bottom-10-mobile"></div>
          <div className="col-md-2 text-right margin-bottom-10-mobile">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => questionsUIProps.openNewQuestionDialog()}
            >
              Créer nouvelle question
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
