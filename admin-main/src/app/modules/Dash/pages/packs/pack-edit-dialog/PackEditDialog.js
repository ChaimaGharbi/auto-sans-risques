import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/packs/packsActions";
import { PackEditDialogHeader } from "./PackEditDialogHeader";
import { PackEditForm } from "./PackEditForm";
import { usePacksUIContext } from "../PacksUIContext";

export function PackEditDialog({ id, show, onHide }) {
  // Packs UI Context
  const packsUIContext = usePacksUIContext();
  const packsUIProps = useMemo(() => {
    return {
      initPack: packsUIContext.initPack,
    };
  }, [packsUIContext]);

  // Packs Redux state
  const dispatch = useDispatch();
  const { actionsLoading, packForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.packs.actionsLoading,
      packForEdit: state.packs.packForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Pack by id
    dispatch(actions.fetchPack(id));
  }, [id, dispatch]);

  // server request for saving pack
  const savePack = (pack) => {
    if (!id) {
      // server request for creating pack
     dispatch(actions.createPack(pack)).then(() => onHide());
    } else {
      // server request for updating pack
      dispatch(actions.updatePack(pack)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PackEditDialogHeader id={id} />
      <PackEditForm
        savePack={savePack}
        actionsLoading={actionsLoading}
        pack={packForEdit || packsUIProps.initPack}
        onHide={onHide}
      />
    </Modal>
  );
}
