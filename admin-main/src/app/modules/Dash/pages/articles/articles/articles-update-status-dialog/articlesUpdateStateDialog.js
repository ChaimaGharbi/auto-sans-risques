import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CategoryStatusCssClasses } from "../CategoriesUIHelpers";
import * as actions from "../../../../_redux/categories/categoriesActions";
import { useCategoriesUIContext } from "../CategoriesUIContext";

const selectedCategories = (entities, ids) => {
  const _categories = [];
  ids.forEach((id) => {
    const category = entities.find((el) => el?._id === id);
    if (category) {
      _categories.push(category);
    }
  });
  return _categories;
};

export function CategoriesUpdateStateDialog({ show, onHide }) {
  // Categories UI Context
  const categoriesUIContext = useCategoriesUIContext();
  const categoriesUIProps = useMemo(() => {
    return {
      ids: categoriesUIContext.ids,
      setIds: categoriesUIContext.setIds,
      queryParams: categoriesUIContext.queryParams,
    };
  }, [categoriesUIContext]);

  // Categories Redux state
  const { categories, isLoading } = useSelector(
    (state) => ({
      categories: selectedCategories(
        state.categories.entities,
        categoriesUIProps.ids
      ),
      isLoading: state.categories.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!categoriesUIProps.ids || categoriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesUIProps.ids]);

  const [status, setStatus] = useState(2);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update categories status by selected ids
    dispatch(
      actions.updateCategoriesStatus(categoriesUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCategories(categoriesUIProps.queryParams)).then(
        () => {
          // clear selections list
          categoriesUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status Will be updated for selected Categories
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
          {categories.map((category) => (
            <div
              className="timeline-item align-items-start"
              key={`categoriesUpdate${category?._id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    CategoryStatusCssClasses[category.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    CategoryStatusCssClasses[category.status]
                  } label-inline`}
                >
                  ID: {category?._id}
                </span>
                <span className="ml-3">{category.categoryEmail}</span>
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
