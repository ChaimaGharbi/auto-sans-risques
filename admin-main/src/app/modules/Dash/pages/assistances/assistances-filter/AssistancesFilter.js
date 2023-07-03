import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useAssistancesUIContext } from "../AssistancesUIContext";

const prepareFilter = (queryParams, values) => {
  const { etat, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  // Filter by type
  const type1 = type !== "" ? +type : 0;
  // Filter by all fields
  if (searchText) {
    
    if (type1 === 0) {
      filter.tel = searchText;
    } else {
      filter._id = searchText;
    }
  }
  filter.etat = etat;
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function AssistancesFilter({ listLoading }) {
  // Assistances UI Context
  const assistancesUIContext = useAssistancesUIContext();
  const assistancesUIProps = useMemo(() => {
    return {
      queryParams: assistancesUIContext.queryParams,
      setQueryParams: assistancesUIContext.setQueryParams,
    };
  }, [assistancesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(assistancesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, assistancesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      assistancesUIProps.setQueryParams(newQueryParams);
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
                  name="etat"
                  placeholder="Filter by Status"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue(
                      "etat",
                      e.target.value === 3 ? "" : e.target.value
                    );
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.etat}
                >
                  <option value="">Tout</option>
                  <option value="EN_ATTENTE">EN_ATTENTE</option>
                  <option value="CONTACTE">CONTACTE</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filtrer</b> par Status
                </small>
              </div>
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
                  <option value="0">Telephone</option>
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
