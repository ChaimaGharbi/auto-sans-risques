/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import * as moment from "moment";


export function LastCompletedOffer({ className, lastOffers }) {
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">
              Last Completed Offers
            </span>
          </h3>
        </div>
        {/* Body */}
        <div className="card-body pt-0">
          <div className="timeline timeline-5 mt-3">
            {lastOffers.map((offer) => {
              return (
                <div
                  key={offer._id}
                  className="timeline-item align-items-start"
                >
                  <div className="timeline-label font-weight-bolder text-dark-25 font-size-sm text-right ">
                    {moment(offer.date).fromNow()}
                  </div>

                  <div className="timeline-badge">
                    <i className="fa fa-genderless text-success icon-xl"></i>
                  </div>

                  <div className="timeline-content text-dark-75 font-size-h6">
                    {offer.offerName}
                  </div>
                  <div className="d-flex flex-column text-right">
                    <span className="text-dark-50 font-weight-bolder font-size-h5">
                      {offer.network.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
