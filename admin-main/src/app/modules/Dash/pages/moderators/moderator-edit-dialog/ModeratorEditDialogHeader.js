import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ModeratorEditDialogHeader({ id }) {
  // ModeratorsRedux state
  const { moderatorForEdit, actionsLoading } = useSelector(
    (state) => ({
      moderatorForEdit: state.moderators.moderatorForEdit,
      actionsLoading: state.moderators.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nouveau Moderator";
    if (moderatorForEdit && id) {
      _title = `Modifier
      Moderator '${moderatorForEdit._id}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [moderatorForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
