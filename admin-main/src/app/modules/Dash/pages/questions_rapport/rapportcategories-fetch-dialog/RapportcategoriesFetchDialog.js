import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { RapportcategoryStatusCssClasses } from "../RapportcategoriesUIHelpers";
import { useRapportcategoriesUIContext } from "../RapportcategoriesUIContext";

const selectedRapportcategories = (entities, ids) => {
  const _rapportcategories = [];
  ids.forEach((id) => {
    const rapportcategory = entities.find((el) => el.id === id);
    if (rapportcategory) {
      _rapportcategories.push(rapportcategory);
    }
  });
  return _rapportcategories;
};

export function RapportcategoriesFetchDialog({ show, onHide }) {
  // Rapportcategories UI Context
  const rapportcategoriesUIContext = useRapportcategoriesUIContext();
  const rapportcategoriesUIProps = useMemo(() => {
    return {
      ids: rapportcategoriesUIContext.ids,
    };
  }, [rapportcategoriesUIContext]);

  // Rapportcategories Redux state
  const { rapportcategories } = useSelector(
    (state) => ({
      rapportcategories: selectedRapportcategories(
        state.rapportcategories.entities,
        rapportcategoriesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if rapportcategories weren't selected we should close modal
  useEffect(() => {
    if (!rapportcategoriesUIProps.ids || rapportcategoriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rapportcategoriesUIProps.ids]);

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
          {rapportcategories.map((rapportcategory) => (
            <div className="timeline-item align-items-start" key={`id${rapportcategory.id}`}>
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
                    ID: {rapportcategory.id}
                </span>
                <span className="ml-3">{rapportcategory.lastName}, {rapportcategory.firstName}</span>                
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
