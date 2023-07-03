import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ExpertEditDialogHeader({ id }) {
  // Experts Redux state
  const { expertForEdit, actionsLoading } = useSelector(
    (state) => ({
      expertForEdit: state.experts.expertForEdit,
      actionsLoading: state.experts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nouveau Expert";
    if (expertForEdit && id) {
      _title = `Modifier Expert '${expertForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [expertForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
