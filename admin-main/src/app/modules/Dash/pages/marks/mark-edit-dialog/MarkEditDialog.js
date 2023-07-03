import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/marks/marksActions";
import { CategoryEditDialogHeader } from "./MarkEditDialogHeader";
import { CategoryEditForm } from "./MarkEditForm";
import { useCategoriesUIContext } from "../MarksUIContext";

export function CategoryEditDialog({ id, show, onHide }) {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      initCategory: categoriesUIContext.initCategory,
    };
  }, [categoriesUIContext]);

  // Categories Redux state
  const dispatch = useDispatch();
  const { actionsLoading, markForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.marks.actionsLoading,
      markForEdit: state.marks.markForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Category by id
    dispatch(actions.fetchMark(id));
  }, [id, dispatch]);

  // server request for saving category
  const saveCategory = (category) => {
    
    if (!id) {
      // server request for creating category
      dispatch(actions.createMark(category)).then(() => onHide());
    } else {
      // server request for updating category
      dispatch(actions.updateMark(category)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CategoryEditDialogHeader id={id} />
      <CategoryEditForm
        saveCategory={saveCategory}
        actionsLoading={actionsLoading}
        category={markForEdit || categoriesUIProps.initCategory}
        onHide={onHide}
      />
    </Modal>
  );
}
