import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../_redux/categories/categoriesActions";
import { CategoryEditDialogHeader } from "./CategoryEditDialogHeader";
import { CategoryEditForm } from "./CategoryEditForm";
import { useCategoriesUIContext } from "../CategoriesUIContext";

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
  const { actionsLoading, categoryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.categories.actionsLoading,
      categoryForEdit: state.categories.categoryForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Category by id
    dispatch(actions.fetchCategory(id));
  }, [id, dispatch]);

  // server request for saving category
  const saveCategory = (category) => {
    
    if (!id) {
      // server request for creating category
      dispatch(actions.createCategory(category)).then(() => onHide());
    } else {
      // server request for updating category
      dispatch(actions.updateCategory(category)).then(() => onHide());
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
        category={categoryForEdit || categoriesUIProps.initCategory}
        onHide={onHide}
      />
    </Modal>
  );
}
