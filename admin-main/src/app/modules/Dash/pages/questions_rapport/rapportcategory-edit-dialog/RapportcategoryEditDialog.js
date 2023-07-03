import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rapportcategories/rapportcategoriesActions";
import { RapportcategoryEditDialogHeader } from "./RapportcategoryEditDialogHeader";
import { RapportcategoryEditForm } from "./RapportcategoryEditForm";
import { useRapportcategoriesUIContext } from "../RapportcategoriesUIContext";

export function RapportcategoryEditDialog({ id, show, onHide }) {
  // Rapportcategories UI Context
  const rapportcategoriesUIContext = useRapportcategoriesUIContext();
  const rapportcategoriesUIProps = useMemo(() => {
    return {
      initRapportcategory: rapportcategoriesUIContext.initRapportcategory,
    };
  }, [rapportcategoriesUIContext]);

  // Rapportcategories Redux state
  const dispatch = useDispatch();
  const { actionsLoading, rapportcategoryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.rapportcategories.actionsLoading,
      rapportcategoryForEdit: state.rapportcategories.rapportcategoryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Rapportcategory by id
    dispatch(actions.fetchRapportcategory(id));
  }, [id, dispatch]);

  // server request for saving rapportcategory
  const saveRapportcategory = (rapportcategory) => {
    
    if (!id) {
      // server request for creating rapportcategory
      dispatch(actions.createRapportcategory(rapportcategory)).then(() => onHide());
    } else {
      // server request for updating rapportcategory
      dispatch(actions.updateRapportcategory(rapportcategory)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <RapportcategoryEditDialogHeader id={id} />
      <RapportcategoryEditForm
        saveRapportcategory={saveRapportcategory}
        actionsLoading={actionsLoading}
        rapportcategory={rapportcategoryForEdit || rapportcategoriesUIProps.initRapportcategory}
        onHide={onHide}
      />
    </Modal>
  );
}
