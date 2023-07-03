import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/avis/avisActions";
import {
  DateColumnFormatter,
  NoteColumnFormatter,
} from "../avis-table/column-formatters";
import ReviewCarousel from "./ReviewCarousel";

export function AvisFetchDetails({ id, show, onHide }) {
  // Avis UI Context
  // Avis Redux state
  const dispatch = useDispatch();
  const { actionsLoading, avisDetails } = useSelector(
    (state) => ({
      actionsLoading: state.avis.actionsLoading,
      avisDetails: state.avis.avisDetails,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Avis by id
    dispatch(actions.fetchAvisDetails(id));
  }, [id, dispatch]);

  
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {avisDetails && (
        <ReviewCarousel
          images={avisDetails.images}
          show={showModal}
          onHide={() => setShowModal(false)}
        />
      )}
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
            Avis détails
          </Modal.Title>
        </Modal.Header>
        {avisDetails && (
          <Modal.Body>
            <div className="">
              <div className="tw-grid tw-grid-cols-2">
                <div className="tw-flex tw-flex-col tw-space-y-4">
                  <div>
                    <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                      EXPERT:{" "}
                    </div>
                    <div>{avisDetails.expertId?.fullName}</div>
                  </div>

                  <div>
                    <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                      CLIENT:{""}
                    </div>
                    <div>{avisDetails.clientId?.fullName}</div>
                  </div>

                  <div>
                    <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                      Note:{" "}
                    </div>
                    <div>{NoteColumnFormatter(undefined, avisDetails)}</div>
                  </div>

                  <div>
                    <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2 tw-leading-8 tw-text-justify">
                      Commentaire:{" "}
                    </div>
                    <div>{avisDetails.commentaire}</div>
                  </div>
                </div>

                <div className="tw-flex tw-flex-col tw-space-y-4">
                  <div className="">
                    <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                      EXPERT ID:{" "}
                    </div>
                    <div>{avisDetails.expertId?._id}</div>
                  </div>

                  <div className="">
                    <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                      CLIENT ID:{""}
                    </div>
                    <div>{avisDetails.clientId?._id}</div>
                  </div>

                  <div className="">
                    <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                      Date:{""}
                    </div>
                    <div>{DateColumnFormatter(undefined, avisDetails)}</div>
                  </div>
                </div>
              </div>

              <div className="tw-py-4">
                <div className="tw-text-gray-800 tw-text-lg tw-font-semibold tw-pr-4 tw-pb-2">
                  Images:{" "}
                </div>
                <div>
                  {" "}
                  <div className="tw-flex tw-flex-row">
                    {avisDetails.images?.length < 1 && "Pas des images"}
                    {avisDetails.images.map((x, i) => {
                      return (
                        <span key={i}>
                          {i < 10 && (
                            <img
                              onClick={() => setShowModal(true)}
                              alt="img"
                              src={x.imageUrl}
                              className="tw-h-16 tw-w-16 tw-pl-2"
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
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
    </>
  );
}
