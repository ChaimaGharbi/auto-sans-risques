import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/experts/expertsActions";
import { ExpertEditDialogHeader } from "./ExpertEditDialogHeader";
import { ExpertEditForm } from "./ExpertEditForm";
import { useExpertsUIContext } from "../ExpertsUIContext";

export function ExpertEditDialog({ id, show, onHide }) {
  // Experts UI Context
  const expertsUIContext = useExpertsUIContext();
  const expertsUIProps = useMemo(() => {
    return {
      initExpert: expertsUIContext.initExpert,
      queryParams: expertsUIContext.queryParams,
    };
  }, [expertsUIContext]);

  // Experts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, expertForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.experts.actionsLoading,
      expertForEdit: state.experts.expertForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Expert by id
    dispatch(actions.fetchExpert(id));
  }, [id, dispatch]);

  // server request for saving expert
  const saveExpert = (expert) => {
    if (!id) {
      // server request for creating expert
      // dispatch(actions.createExpert(expert)).then(() => onHide());
    } else {
      // server request for updating expert
      dispatch(actions.updateExpert(expert)).then(() => {
        dispatch(actions.fetchExperts(expertsUIProps.queryParams));
        onHide();
      });
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ExpertEditDialogHeader id={id} />
      <ExpertEditForm
        saveExpert={saveExpert}
        actionsLoading={actionsLoading}
        expert={expertForEdit || expertsUIProps.initExpert}
        onHide={onHide}
      />
    </Modal>
  );
}
