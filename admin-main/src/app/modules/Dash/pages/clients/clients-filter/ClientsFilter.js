import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useClientsUIContext } from "../ClientsUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by type
  const type1 = type !== "" ? +type : 0;
  // Filter by all fields
  if (searchText) {
    if (type1 === 1) {
      filter.email = searchText;
    } else if (type1 === 2) {
      filter.fullName = searchText;
    }else if (type1 === 4) {
      filter.address = searchText;
    } else if (type1 === 5) {
      filter.tel = searchText;
    } else {
      filter._id = searchText;
    }
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function ClientsFilter({ listLoading }) {
  // Clients UI Context
  const clientsUIContext = useClientsUIContext();
  const clientsUIProps = useMemo(() => {
    return {
      queryParams: clientsUIContext.queryParams,
      setQueryParams: clientsUIContext.setQueryParams,
    };
  }, [clientsUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(clientsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, clientsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      clientsUIProps.setQueryParams(newQueryParams);
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
                  name="status"
                  placeholder="Filter by Status"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue("status", e.target.value == 3 ? "":  e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="3">Tout</option>
                  <option value="1">Active</option>
                  <option value="2">Banni(e)</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filtrer</b> par Status
                </small>
              </div>
              <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Choose Filter Field"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="0">ID</option>
                  <option value="1">Email</option>
                  <option value="2">Nom & Prenom</option>
                  <option value="4">Adresse</option>
                  <option value="5">Telephone</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> par champ
                </small>
              </div>
              <div className="col-lg-2">
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
                  <b>Chercher</b> dans le champ spécifique
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
