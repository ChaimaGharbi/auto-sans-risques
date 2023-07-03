import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function PackEditDialogHeader({ id }) {
  // Packs Redux state
  const { packForEdit, actionsLoading } = useSelector(
    (state) => ({
      packForEdit: state.packs.packForEdit,
      actionsLoading: state.packs.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nouveau Pack";
    if (packForEdit && id) {
      _title = `Modifier
       Pack '${packForEdit._id}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [packForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
