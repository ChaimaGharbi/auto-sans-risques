import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useArticlesUIContext } from "./ArticlesUIContext";

const prepareFilter = (queryParams, values) => {
  const { searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  filter.title = searchText;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ArticlesFilter() {
  // Articles UI Context
  const articlesUIContext = useArticlesUIContext();
  const articlesUIProps = useMemo(() => {
    return {
      setQueryParams: articlesUIContext.setQueryParams,
      openNewArticleDialog: articlesUIContext.openNewArticleDialog,
      queryParams: articlesUIContext.queryParams,
    };
  }, [articlesUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(articlesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, articlesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      articlesUIProps.setQueryParams(newQueryParams);
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
                      <b>Chercher</b> par Titre d'article
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
              onClick={() => articlesUIProps.openNewArticleDialog()}
            >
              Créer nouvel article
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
