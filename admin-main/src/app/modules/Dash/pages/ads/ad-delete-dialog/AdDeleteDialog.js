import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/ads/adsActions";
import { useAdsUIContext } from "../AdsUIContext";

export function AdDeleteDialog({ id, show, onHide }) {
  // AdsUI Context
  const adsUIContext = useAdsUIContext();
  const adsUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteAd = () => {
    // server request for deleting ad by id
    dispatch(actions.deleteAd(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchAds(adsUIProps.queryParams));
      // clear selections list
      adsUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Supprimer le ad
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Souhaitez-vous supprimer cette ad?</span>}
        {isLoading && <span>Le ad est en train de suppression ...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            fermer
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteAd}
            className="btn btn-danger btn-elevate"
          >
            Supprimer le ad
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
