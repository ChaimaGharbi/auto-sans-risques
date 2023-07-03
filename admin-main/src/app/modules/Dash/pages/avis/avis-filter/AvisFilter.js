import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useAvisUIContext } from "../AvisUIContext";

const prepareFilter = (queryParams, values) => {
  const { type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  // Filter by type
  const type1 = type !== "" ? +type : 0;
  // Filter by all fields
  if (searchText) {
    
    if (type1 === 0) {
      filter.clientId = searchText;
    } else if (type1 === 1) {
      filter.expertId = searchText;
    } else {
      filter._id = searchText;
    }
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function AvisFilter({ listLoading }) {
  // Avis UI Context
  const avisUIContext = useAvisUIContext();
  const avisUIProps = useMemo(() => {
    return {
      queryParams: avisUIContext.queryParams,
      setQueryParams: avisUIContext.setQueryParams,
    };
  }, [avisUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(avisUIProps.queryParams, values);
    if (!isEqual(newQueryParams, avisUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      avisUIProps.setQueryParams(newQueryParams);
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
                <select
                  className="form-control"
                  placeholder="Choisissez le champ de filtre"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="0">CLIENT ID</option>
                  <option value="1">EXPERT ID</option>
                  <option value="2">ID</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filtrer</b> par champ
                </small>
              </div>
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
                  <b> Rechercher </b> dans le champ spécifique
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
