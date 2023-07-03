import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ClientStatusCssClasses } from "../ClientsUIHelpers";
import * as actions from "../../../_redux/clients/clientsActions";
import { useClientsUIContext } from "../ClientsUIContext";

const selectedClients = (entities, ids) => {
  const _clients = [];
  ids.forEach((id) => {
    const client = entities.find((el) => el._id === id);
    if (client) {
      _clients.push(client);
    }
  });
  return _clients;
};

export function ClientsUpdateStateDialog({ show, onHide }) {
  // Clients UI Context
  const clientsUIContext = useClientsUIContext();
  const clientsUIProps = useMemo(() => {
    return {
      ids: clientsUIContext.ids,
      setIds: clientsUIContext.setIds,
      queryParams: clientsUIContext.queryParams,
    };
  }, [clientsUIContext]);

  // Clients Redux state
  const { clients, isLoading } = useSelector(
    (state) => ({
      clients: selectedClients(state.clients.entities, clientsUIProps.ids),
      isLoading: state.clients.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!clientsUIProps.ids || clientsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update clients status by selected ids
    dispatch(actions.updateClientsStatus(clientsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchClients(clientsUIProps.queryParams)).then(() => {
          // clear selections list
          clientsUIProps.setIds([]);
          // closing delete modal
          onHide();
        });
      }
    );
  };
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Le statut sera mis à jour pour les utilisateurs sélectionnés
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}

        <div className="timeline timeline-5 mt-3">
          {clients.map((client) => (
            <div
              className="timeline-item align-items-start"
              key={`clientsUpdate${client._id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    ClientStatusCssClasses[client.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    ClientStatusCssClasses[client.status]
                  } label-inline`}
                >
                  ID: {client._id}
                </span>
                <span className="ml-3">{client.email}</span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="1">Active</option>
            <option value="2">Banni(e)</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Modifier Statut
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
