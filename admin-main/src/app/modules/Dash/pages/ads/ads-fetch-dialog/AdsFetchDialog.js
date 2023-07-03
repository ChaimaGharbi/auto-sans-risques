import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { AdStatusCssClasses } from "../AdsUIHelpers";
import { useAdsUIContext } from "../AdsUIContext";

const selectedAds = (entities, ids) => {
  const _ads = [];
  ids.forEach((id) => {
    const ad = entities.find((el) => el.id === id);
    if (ad) {
      _ads.push(ad);
    }
  });
  return _ads;
};

export function AdsFetchDialog({ show, onHide }) {
  // AdsUI Context
  const adsUIContext = useAdsUIContext();
  const adsUIProps = useMemo(() => {
    return {
      ids: adsUIContext.ids,
    };
  }, [adsUIContext]);

  // AdsRedux state
  const { ads } = useSelector(
    (state) => ({
      ads: selectedAds(state.ads.entities, adsUIProps.ids),
    }),
    shallowEqual
  );

  // if ads weren't selected we should close modal
  useEffect(() => {
    if (!adsUIProps.ids || adsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adsUIProps.ids]);

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
          {ads.map((ad) => (
            <div className="timeline-item align-items-start" key={`id${ad.id}`}>
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    AdStatusCssClasses[ad.isActive]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    AdStatusCssClasses[ad.isActive]
                  } label-inline`}
                >
                  ID: {ad.id}
                </span>
                <span className="ml-3">{ad.body}</span>
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
