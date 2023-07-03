/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import * as moment from "moment";

const RedeemStatusCssClasses = ["info", "success", "danger", ""];
const RedeemStatusTitles = ["Pending", "Sent", "Rejected", ""];
const getLabelCssClasses = (x) => {
  return `label label-lg label-light-${RedeemStatusCssClasses[x]} label-inline`;
};

export function LastRedeems({ className, lastRedeems }) {
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">Last Redeems</span>
          </h3>
        </div>
        {/* Body */}
        <div className="card-body pt-0">
          <div className="timeline timeline-5 mt-3">
            {lastRedeems.map((redeem) => {
              return (
                <div
                  key={redeem._id}
                  className="timeline-item align-items-start"
                >
                  <div className="timeline-label font-weight-bolder text-dark-25 font-size-sm text-right ">
                    {moment(redeem.redeemDate).fromNow()}
                  </div>

                  <div className="timeline-badge">
                    <i className="fa fa-genderless text-primary icon-xl"></i>
                  </div>

                  <div className="timeline-content text-dark-75 font-size-h6">
                    {redeem.rewardAmount} {redeem.rewardName}
                  </div>
                  <div className="d-flex flex-column text-right">
                    <span className="text-dark-50 font-weight-bolder font-size-h5">
                      <span className={getLabelCssClasses(redeem.status)}>
                        {RedeemStatusTitles[redeem.status]}
                      </span>
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
