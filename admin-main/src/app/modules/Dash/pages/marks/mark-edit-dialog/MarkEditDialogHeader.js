import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CategoryEditDialogHeader({ id }) {
  // Categories Redux state
  const { markForEdit, actionsLoading } = useSelector(
    (state) => ({
      markForEdit: state.marks.markForEdit,
      actionsLoading: state.marks.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nouvelle Marque";
    if (markForEdit && id) {
      _title = `Modifier marque '${markForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [markForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
