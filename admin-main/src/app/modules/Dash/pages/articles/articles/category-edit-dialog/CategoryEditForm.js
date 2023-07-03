// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
} from "../../../../../../../_metronic/_partials/controls";

import { ModalProgressBar } from "../../../../../../../_metronic/_partials/controls";

// Validation schema
const CategoryEditSchema = Yup.object().shape({
  priority: Yup.number().required("La priorité est requise"),
  category_name: Yup.string().required("Nom de catégorie est requise")
});

export function CategoryEditForm({
  saveCategory,
  category,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={category}
        validationSchema={CategoryEditSchema}
        onSubmit={(values) => {
          
          saveCategory(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && <ModalProgressBar />}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Shared Key */}
                  <div className="col-lg-6">
                    <Field
                      name="category_name"
                      component={Input}
                      placeholder="Article catégorie"
                      label="Article catégorie"
                      type="text"
                    />
                  </div>

                  {/* add to credit */}
                  <div className="col-lg-6">
                    <Field
                      name="priority"
                      component={Input}
                      placeholder="La priorité"
                      label="La priorité (Ordre d'affichage)"
                      type="number"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Annuler
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Enregistrer
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
