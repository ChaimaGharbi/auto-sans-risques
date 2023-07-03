import React, { useMemo } from "react";
import { useRapportcategoriesUIContext } from "../RapportcategoriesUIContext";

export function RapportcategoriesGrouping() {
  // Rapportcategories UI Context
  const rapportcategoriesUIContext = useRapportcategoriesUIContext();
  const rapportcategoriesUIProps = useMemo(() => {
    return {
      ids: rapportcategoriesUIContext.ids,
      setIds: rapportcategoriesUIContext.setIds,
      openDeleteRapportcategoriesDialog: rapportcategoriesUIContext.openDeleteRapportcategoriesDialog,
      openFetchRapportcategoriesDialog: rapportcategoriesUIContext.openFetchRapportcategoriesDialog,
      openUpdateRapportcategoriesStatusDialog:
        rapportcategoriesUIContext.openUpdateRapportcategoriesStatusDialog,
    };
  }, [rapportcategoriesUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                Nombre d'enregistrements sélectionnés: <b>{rapportcategoriesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-danger font-weight-bolder font-size-sm"
                onClick={rapportcategoriesUIProps.openDeleteRapportcategoriesDialog}
              >
                <i className="fa fa-trash"></i> Tout supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
