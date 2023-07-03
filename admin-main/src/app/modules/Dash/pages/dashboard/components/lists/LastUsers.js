/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import * as moment from "moment";


export function LastUsers({ className, lastUsers }) {
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">Last Users</span>
          </h3>
        </div>
        {/* Body */}
        <div className="card-body pt-0">
          <div className="timeline timeline-5 mt-3">
            {lastUsers.map((user) => {
              return (
                <div key={user._id} className="timeline-item align-items-start">
                  <div className="timeline-label font-weight-bolder text-dark-25 font-size-sm text-right ">
                    {moment(user.createdAt).fromNow()}
                  </div>

                  <div className="timeline-badge">
                    <i className="fa fa-genderless text-info icon-xl"></i>
                  </div>

                  <div className="timeline-content text-dark-75 font-size-h6">
                    {user.username}
                  </div>
                  <div className="d-flex flex-column text-right">
                    <span className="text-dark-50 font-weight-bolder font-size-h5">
                    {user.device==="Android" ? <i className="fab fa-android"></i> : <i className="fab fa-apple"></i>}
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
