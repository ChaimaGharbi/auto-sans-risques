import React, { useEffect, useState } from "react";
import { Image, Modal } from "react-bootstrap";

import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/experts/expertsActions";
import EyeIcon from "../../../../../../_metronic/_partials/controls/forms/img/EyeIcon";
import DocViewer from "./DocViewer";

export function ExpertFetchDetails({ id, show, onHide }) {
  // Experts UI Context
  // Experts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, expertForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.experts.actionsLoading,
      expertForEdit: state.experts.expertForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Expert by id
    dispatch(actions.fetchExpert(id));
  }, [id, dispatch]);

  
  const [showModal, setShowModal] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);
  const [link, setLink] = useState("");

  return (
    <>
      <DocViewer
        lien={link}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        {/*begin::Loading*/}
        {actionsLoading && <ModalProgressBar />}
        {/*end::Loading*/}

        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Expert détails
          </Modal.Title>
        </Modal.Header>
        {expertForEdit && (
          <Modal.Body>
            <div>
              <div className="tw-flex tw-flex-col items-center">
                <InfoUser label="ID" render={() => expertForEdit._id} />
                <InfoUser
                  label="Nom & Prénom"
                  render={() => expertForEdit.fullName}
                />
                <InfoUser label="Email" render={() => expertForEdit.email} />
                <InfoUser
                  label="Création Date"
                  render={() =>
                    new Date(expertForEdit.createdAt).toLocaleString()
                  }
                />
                <InfoUser
                  label="Specialite"
                  render={() => (
                    <div className=" tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center">
                      <div className="tw-w-4/5 tw-line-clamp-1">
                        <div className="p-2">
                          {expertForEdit.specialitiesModels &&
                            expertForEdit.specialitiesModels.map((model) => (
                              <div
                                key={model._id}
                                className="pb-1 tw-flex tw-flex-row tw-items-center tw-justify-between"
                              >
                                <div>
                                  <span className="tw-font-bold">
                                    {model.name}
                                  </span>{" "}
                                  {expertForEdit.specialitiesMarks.filter(
                                    (m) => m.modelId === model._id
                                  ).length > 0 ? (
                                    <>
                                      (
                                      {expertForEdit.specialitiesMarks
                                        .filter((m) => m.modelId === model._id)
                                        .map((m) => m.name)
                                        .join(", ")}
                                      )
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                />
                <InfoUser
                  label=" Carte d’identité Nationale"
                  render={() => (
                    <div className=" tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center">
                      <div className=" tw-w-4/5 tw-line-clamp-1">
                        {expertForEdit.cin}
                      </div>
                      {expertForEdit.cin ? (
                        <button
                          onClick={() => {
                            setLink(expertForEdit.cin);
                            setShowModal(true);
                          }}
                          className={`tw-bg-gray-50 tw-text-blue-700 tw-px-4 tw-mx-2 tw-mt-1 tw-py-2 tw-rounded-lg hover:tw-bg-blue-200`}
                        >
                          <EyeIcon className="tw-h-6 tw-w-6" />
                        </button>
                      ) : (
                        "Pas fourni"
                      )}
                    </div>
                  )}
                />
                <InfoUser
                  label="Diplome/Attestation"
                  render={() => (
                    <div className=" tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center">
                      <div className=" tw-w-4/5 tw-line-clamp-1">
                        {expertForEdit.diplome}
                      </div>
                      {expertForEdit.diplome ? (
                        <button
                          onClick={() => {
                            setLink(expertForEdit.diplome);
                            setShowModal(true);
                          }}
                          className={`tw-bg-gray-50 tw-text-blue-700 tw-px-4 tw-mx-2 tw-mt-1 tw-py-2 tw-rounded-lg hover:tw-bg-blue-200`}
                        >
                          <EyeIcon className="tw-h-6 tw-w-6" />
                        </button>
                      ) : (
                        "Pas fourni"
                      )}
                    </div>
                  )}
                />
                <InfoUser
                  label="Carte d’identification fiscale"
                  render={() => (
                    <div className=" tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center">
                      <div className=" tw-w-4/5 tw-line-clamp-1">
                        {expertForEdit.carteFiscale}
                      </div>
                      {expertForEdit.carteFiscale ? (
                        <button
                          onClick={() => {
                            setLink(expertForEdit.carteFiscale);
                            setShowModal(true);
                          }}
                          className={`tw-bg-gray-50 tw-text-blue-700 tw-px-4 tw-mx-2 tw-mt-1 tw-py-2 tw-rounded-lg hover:tw-bg-blue-200`}
                        >
                          <EyeIcon className="tw-h-6 tw-w-6" />
                        </button>
                      ) : (
                        "Pas fourni"
                      )}
                    </div>
                  )}
                />
                <InfoUser
                  label="Photo d'atelier"
                  render={() => (
                    <div className=" tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center">
                      <div className=" tw-w-4/5 tw-line-clamp-1">
                        {expertForEdit.photoAtelier}
                      </div>
                      {expertForEdit.photoAtelier ? (
                        <button
                          onClick={() => {
                            setLink(expertForEdit.photoAtelier);
                            setShowModal(true);
                          }}
                          className={`tw-bg-gray-50 tw-text-blue-700 tw-px-4 tw-mx-2 tw-mt-1 tw-py-2 tw-rounded-lg hover:tw-bg-blue-200`}
                        >
                          <EyeIcon className="tw-h-6 tw-w-6" />
                        </button>
                      ) : (
                        "Pas fourni"
                      )}
                    </div>
                  )}
                />
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

function InfoUser({ label, render }) {
  return (
    <div className=" tw-w-full tw-mt-2 tw-border-2 tw-border-gray-200 tw-flex tw-flex-row ">
      <div className=" tw-w-2/5 tw-text-gray-800 tw-bg-gray-100 tw-text-lg tw-border-r-2 tw-border-r-gray-200">
        {label}
      </div>
      <div className="tw-pl-4 tw-w-3/5">{render ? render() : ""}</div>
    </div>
  );
}
