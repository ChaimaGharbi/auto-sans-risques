/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/marks/marksActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { Articles } from "../marks-models/Models";
import { ArticlesUIProvider } from "../marks-models/ModelsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

const initCategory = {
  id: undefined,
  model: "",
  manufacture: "Pontiac",
  modelYear: 2020,
  mileage: 0,
  description: "",
  color: "Red",
  price: 10000,
  condition: 1,
  status: 0,
  VINCode: "",
};

export function MarkEdit({
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
  const { actionsLoading, markForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.marks.actionsLoading,
      markForEdit: state.marks.markForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchMark(_id));
  }, [_id, dispatch]);

  useEffect(() => {
    let _title = _id ? "" : "";
    if (markForEdit && _id) {
      _title = `Ajouter des models à ${markForEdit.name?.toUpperCase()}`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markForEdit, _id]);

  const backToCategoriesList = () => {
    history.push(`/dash/marques/marks`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToCategoriesList}
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
          <ArticlesUIProvider history={history} currentCategoryId={_id}>
            <Articles />
          </ArticlesUIProvider>
        )}
      </CardBody>
    </Card>
  );
}
