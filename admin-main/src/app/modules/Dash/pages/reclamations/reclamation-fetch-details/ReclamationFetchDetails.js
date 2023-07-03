import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";

import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/reclamations/reclamationsActions";
import * as columnFormatters from "../reclamations-table/column-formatters";

export function ReclamationFetchDetails({ id, show, onHide }) {
  // Reclamations UI Context
  // Reclamations Redux state
  const dispatch = useDispatch();
  const { actionsLoading, reclamationDetails } = useSelector(
    (state) => ({
      actionsLoading: state.reclamations.actionsLoading,
      reclamationDetails: state.reclamations.reclamationDetails,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Reclamation by id
    dispatch(actions.fetchReclamationDetails(id));
  }, [id, dispatch]);

  
  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {actionsLoading && <ModalProgressBar />}
      {/*end::Loading*/}

      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Réclamation détails
        </Modal.Title>
      </Modal.Header>
      {reclamationDetails && (
        <Modal.Body>
          <div className="tw-pr-16">
            <div className="tw-flex tw-flex-row tw-justify-between">
              <div className="tw-pb-2">
                <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                  Réclameur:{" "}
                </div>
                <div>{reclamationDetails.fullName}</div>
              </div>
              <div className="tw-pb-2">
                <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                  Email:{" "}
                </div>
                <div>{reclamationDetails.email}</div>
              </div>
            </div>
            <div className="tw-flex tw-flex-row tw-justify-between">
              <div className="tw-pb-2">
                <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                  Telephone:{" "}
                </div>
                <div>{reclamationDetails.tel}</div>
              </div>
              <div className="tw-pb-2 tw-pr-16">
                <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                  Etat:{"     "}
                </div>
                <div>{columnFormatters.StatusColumnFormatter(undefined,reclamationDetails.etat)}</div>
              </div>
            </div>
            <div className="tw-pb-2">
              <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                Sujet:{" "}
              </div>
              <div>{reclamationDetails.title}</div>
            </div>
            <div className="tw-pb-2">
              <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2 tw-leading-8 tw-text-justify">
                Message:{" "}
              </div>
              <div>{reclamationDetails.description}</div>
            </div>
          </div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Ok
          </button>
          <> </>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
