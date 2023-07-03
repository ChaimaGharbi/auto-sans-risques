import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RapportcategoryStatusCssClasses } from "../RapportcategoriesUIHelpers";
import * as actions from "../../../_redux/rapportcategories/rapportcategoriesActions";
import { useRapportcategoriesUIContext } from "../RapportcategoriesUIContext";

const selectedRapportcategories = (entities, ids) => {
  const _rapportcategories = [];
  ids.forEach((id) => {
    const rapportcategory = entities.find((el) => el._id === id);
    if (rapportcategory) {
      _rapportcategories.push(rapportcategory);
    }
  });
  return _rapportcategories;
};

export function RapportcategoriesUpdateStateDialog({ show, onHide }) {
  // Rapportcategories UI Context
  const rapportcategoriesUIContext = useRapportcategoriesUIContext();
  const rapportcategoriesUIProps = useMemo(() => {
    return {
      ids: rapportcategoriesUIContext.ids,
      setIds: rapportcategoriesUIContext.setIds,
      queryParams: rapportcategoriesUIContext.queryParams,
    };
  }, [rapportcategoriesUIContext]);

  // Rapportcategories Redux state
  const { rapportcategories, isLoading } = useSelector(
    (state) => ({
      rapportcategories: selectedRapportcategories(
        state.rapportcategories.entities,
        rapportcategoriesUIProps.ids
      ),
      isLoading: state.rapportcategories.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!rapportcategoriesUIProps.ids || rapportcategoriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rapportcategoriesUIProps.ids]);

  const [status, setStatus] = useState(2);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update rapportcategories status by selected ids
    dispatch(actions.updateRapportcategoriesStatus(rapportcategoriesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchRapportcategories(rapportcategoriesUIProps.queryParams)).then(
          () => {
            // clear selections list
            rapportcategoriesUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status Will be updated for selected Rapportcategories
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}

        <div className="timeline timeline-5 mt-3">
          {rapportcategories.map((rapportcategory) => (
            <div
              className="timeline-item align-items-start"
              key={`rapportcategoriesUpdate${rapportcategory._id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    RapportcategoryStatusCssClasses[rapportcategory.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    RapportcategoryStatusCssClasses[rapportcategory.status]
                  } label-inline`}
                >
                  ID: {rapportcategory._id}
                </span>
                <span className="ml-3">
                  {rapportcategory.rapportcategoryEmail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Pending</option>
            <option value="1">Sent</option>
            <option value="2">Rejected</option>

          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
