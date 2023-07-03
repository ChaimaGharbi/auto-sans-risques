// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with question first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";

import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

// Validation schema
const RapportcategoryEditSchema = Yup.object().shape({
  priority: Yup.number().required("La priorité est requise"),
  category_name: Yup.string().required("Nom de catégorie est requise"),
});

export function RapportcategoryEditForm({
  saveRapportcategory,
  rapportcategory,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={rapportcategory}
        validationSchema={RapportcategoryEditSchema}
        onSubmit={(values) => {
          
          saveRapportcategory(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && <ModalProgressBar />}
              <Form className="form form-label-right">
                <div className="form-group row">
                    <Field
                      name="category_name"
                      component={Input}
                      placeholder="Question catégorie"
                      label="Question catégorie"
                      type="text"
                    />
                </div>
                <div className="form-group row">
                    <Field
                      name="priority"
                      component={Input}
                      placeholder="La priorité"
                      label="La priorité (Ordre d'affichage)"
                      type="number"
                    />
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
