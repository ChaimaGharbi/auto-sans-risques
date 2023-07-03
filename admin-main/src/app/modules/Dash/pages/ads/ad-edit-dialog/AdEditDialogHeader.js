import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function AdEditDialogHeader({ id }) {
  // AdsRedux state
  const { adForEdit, actionsLoading } = useSelector(
    (state) => ({
      adForEdit: state.ads.adForEdit,
      actionsLoading: state.ads.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nouveau Banniére";
    if (adForEdit && id) {
      _title = `Modifier
      Banniére '${adForEdit._id}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [adForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
