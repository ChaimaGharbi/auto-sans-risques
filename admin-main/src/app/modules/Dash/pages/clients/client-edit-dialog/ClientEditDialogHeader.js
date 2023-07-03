import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function ClientEditDialogHeader({ id }) {
  // Clients Redux state
  const { clientForEdit, actionsLoading } = useSelector(
    (state) => ({
      clientForEdit: state.clients.clientForEdit,
      actionsLoading: state.clients.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nouveau Client";
    if (clientForEdit && id) {
      _title = `Modifier Client '${clientForEdit.fullName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [clientForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
