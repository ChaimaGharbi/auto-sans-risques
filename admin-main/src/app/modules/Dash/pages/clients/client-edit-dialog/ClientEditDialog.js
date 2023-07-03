import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/clients/clientsActions";
import { ClientEditDialogHeader } from "./ClientEditDialogHeader";
import { ClientEditForm } from "./ClientEditForm";
import { useClientsUIContext } from "../ClientsUIContext";

export function ClientEditDialog({ id, show, onHide }) {
  // Clients UI Context
  const clientsUIContext = useClientsUIContext();
  const clientsUIProps = useMemo(() => {
    return {
      initClient: clientsUIContext.initClient,
      queryParams: clientsUIContext.queryParams,
    };
  }, [clientsUIContext]);

  // Clients Redux state
  const dispatch = useDispatch();
  const { actionsLoading, clientForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.clients.actionsLoading,
      clientForEdit: state.clients.clientForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Client by id
    dispatch(actions.fetchClient(id));
  }, [id, dispatch]);

  // server request for saving client
  const saveClient = (client) => {
    if (!id) {
      // server request for creating client
     // dispatch(actions.createClient(client)).then(() => onHide());
    } else {
      // server request for updating client
      dispatch(actions.updateClient(client)).then(() => {
        dispatch(actions.fetchClients(clientsUIProps.queryParams));
        onHide()
      });
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ClientEditDialogHeader id={id} />
      <ClientEditForm
        saveClient={saveClient}
        actionsLoading={actionsLoading}
        client={clientForEdit || clientsUIProps.initClient}
        onHide={onHide}
      />
    </Modal>
  );
}
