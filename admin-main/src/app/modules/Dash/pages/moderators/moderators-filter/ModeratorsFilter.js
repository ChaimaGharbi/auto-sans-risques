import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useModeratorsUIContext } from "../ModeratorsUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  // Filter by all fields
  if (searchText) {
    filter._id = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ModeratorsFilter({ listLoading }) {
  // ModeratorsUI Context
  const moderatorsUIContext = useModeratorsUIContext();
  const moderatorsUIProps = useMemo(() => {
    return {
      queryParams: moderatorsUIContext.queryParams,
      setQueryParams: moderatorsUIContext.setQueryParams,
    };
  }, [moderatorsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(moderatorsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, moderatorsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      moderatorsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Susspended=0/Active=1/Pending=2
          type: "", // values => All=""/Business=0/Individual=1
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
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Chercher"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Chercher</b> par ID
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
