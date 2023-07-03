/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/rapportcategories/rapportcategoriesActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { Questions } from "../rapportcategory-questions/Questions";
import { QuestionsUIProvider } from "../rapportcategory-questions/QuestionsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function RapportcategoryEdit({
  history,
  match: {
    params: { _id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  

  // Tabs
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, rapportcategoryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.rapportcategories.actionsLoading,
      rapportcategoryForEdit: state.rapportcategories.rapportcategoryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchRapportcategory(_id));
  }, [_id, dispatch]);

  useEffect(() => {
    let _title = _id ? "" : "";
    if (rapportcategoryForEdit && _id) {
      _title = `Ajouter des questions à '${rapportcategoryForEdit.category_name}'`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rapportcategoryForEdit, _id]);


  const backToRapportcategoriesList = () => {
    history.push(`/dash/questions/rapportcategories`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToRapportcategoriesList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Retour
          </button>
          {`  `}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {_id && (
          <QuestionsUIProvider history={history} currentRapportcategoryId={_id}>
            <Questions />
          </QuestionsUIProvider>
        )}
      </CardBody>
    </Card>
  );
}
