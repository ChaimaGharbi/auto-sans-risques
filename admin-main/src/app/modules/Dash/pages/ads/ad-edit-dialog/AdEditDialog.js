import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ads/adsActions";
import { AdEditDialogHeader } from "./AdEditDialogHeader";
import { AdEditForm } from "./AdEditForm";
import { useAdsUIContext } from "../AdsUIContext";

export function AdEditDialog({ id, show, onHide }) {
  // AdsUI Context
  const adsUIContext = useAdsUIContext();
  const adsUIProps = useMemo(() => {
    return {
      initPack: adsUIContext.initPack,
    };
  }, [adsUIContext]);

  // AdsRedux state
  const dispatch = useDispatch();
  const { actionsLoading, adForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.ads.actionsLoading,
      adForEdit: state.ads.adForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting ad by id
    dispatch(actions.fetchAd(id));
  }, [id, dispatch]);

  // server request for saving ad
  const saveAd = (ad) => {
    
    if (!id) {
      // server request for creating ad
      dispatch(actions.createAd(ad)).then(() => onHide());
    } else {
      // server request for updating ad
      dispatch(actions.updateAd(ad)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="md"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <AdEditDialogHeader id={id} />
      <AdEditForm
        saveAd={saveAd}
        actionsLoading={actionsLoading}
        ad={adForEdit || adsUIProps.initPack}
        onHide={onHide}
      />
    </Modal>
  );
}
