import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useRapportcategoriesUIContext } from "../RapportcategoriesUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, type, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  // Filter by type
  const type1 = type !== "" ? +type : 0;
  // Filter by all fields
  if (searchText) {
    if(type1===0) {
      filter.category_name = searchText;
    } else {
      filter._id = searchText;

    }
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function RapportcategoriesFilter({ listLoading }) {
  // Rapportcategories UI Context
  const rapportcategoriesUIContext = useRapportcategoriesUIContext();
  const rapportcategoriesUIProps = useMemo(() => {
    return {
      queryParams: rapportcategoriesUIContext.queryParams,
      setQueryParams: rapportcategoriesUIContext.setQueryParams,
    };
  }, [rapportcategoriesUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(rapportcategoriesUIProps.queryParams, values);
    if (!isEqual(newQueryParams, rapportcategoriesUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      rapportcategoriesUIProps.setQueryParams(newQueryParams);
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
                  placeholder="Choose Filter Field"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="0">Nom de Catégorie</option>
                  <option value="1">ID</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filrer</b>
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
                  <b>Rechercher</b>
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
