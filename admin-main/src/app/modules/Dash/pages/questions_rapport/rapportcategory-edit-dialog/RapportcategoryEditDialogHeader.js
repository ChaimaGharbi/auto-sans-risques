import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function RapportcategoryEditDialogHeader({ id }) {
  // Rapportcategories Redux state
  const { rapportcategoryForEdit, actionsLoading } = useSelector(
    (state) => ({
      rapportcategoryForEdit: state.rapportcategories.rapportcategoryForEdit,
      actionsLoading: state.rapportcategories.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "Nouvelle catégorie";
    if (rapportcategoryForEdit && id) {
      _title = `Modifier catégorie '${rapportcategoryForEdit.category_name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [rapportcategoryForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
