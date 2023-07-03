import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { ClientStatusCssClasses } from "../ClientsUIHelpers";
import { useClientsUIContext } from "../ClientsUIContext";

const selectedClients = (entities, ids) => {
  const _clients = [];
  ids.forEach((id) => {
    const client = entities.find((el) => el.id === id);
    if (client) {
      _clients.push(client);
    }
  });
  return _clients;
};

export function ClientsFetchDialog({ show, onHide }) {
  // Clients UI Context
  const clientsUIContext = useClientsUIContext();
  const clientsUIProps = useMemo(() => {
    return {
      ids: clientsUIContext.ids,
    };
  }, [clientsUIContext]);

  // Clients Redux state
  const { clients } = useSelector(
    (state) => ({
      clients: selectedClients(
        state.clients.entities,
        clientsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if clients weren't selected we should close modal
  useEffect(() => {
    if (!clientsUIProps.ids || clientsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline timeline-5 mt-3">
          {clients.map((client) => (
            <div className="timeline-item align-items-start" key={`id${client.id}`}>
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
                    ID: {client.id}
                </span>
                <span className="ml-3">{client.lastName}, {client.firstName}</span>                
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
