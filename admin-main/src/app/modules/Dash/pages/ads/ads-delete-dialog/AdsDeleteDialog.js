import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ads/adsActions";
import { useAdsUIContext } from "../AdsUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function AdsDeleteDialog({ show, onHide }) {
  // AdsUI Context
  const adsUIContext = useAdsUIContext();
  const adsUIProps = useMemo(() => {
    return {
      ids: adsUIContext.ids,
      setIds: adsUIContext.setIds,
      queryParams: adsUIContext.queryParams,
    };
  }, [adsUIContext]);

  // AdsRedux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.ads.actionsLoading }),
    shallowEqual
  );

  // if ads weren't selected we should close modal
  useEffect(() => {
    if (!adsUIProps.ids || adsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAds = () => {
    // server request for deleting ad by selected ids
    dispatch(actions.deleteAds(adsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAds(adsUIProps.queryParams)).then(() => {
        // clear selections list
        adsUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Supprimer Packs
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Êtes-vous sûr de supprimer définitivement les banniére
            sélectionnées?
          </span>
        )}
        {isLoading && <span>Banniéres est en train de suppression...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Annuler
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteAds}
            className="btn btn-primary btn-elevate"
          >
            Supprimer
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
