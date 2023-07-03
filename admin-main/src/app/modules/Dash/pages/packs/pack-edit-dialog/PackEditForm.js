// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";

import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

// Validation schema
const PackEditSchema = Yup.object().shape({
  nb_missions: Yup.number().required("Nombre de missions est requis"),
  prix: Yup.number().required("Prix est requis"),
  priority: Yup.number().required("Priorité est requis"),
});

export function PackEditForm({ savePack, pack, actionsLoading, onHide }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={pack}
        validationSchema={PackEditSchema}
        onSubmit={(values) => {
          
          savePack(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && <ModalProgressBar />}
              <Form className="form form-label-right">
                <div className="form-group">
                  {/* Shared Key */}
                  <div className="row">
                    <Field
                      name="nb_missions"
                      component={Input}
                      placeholder="Nombre de missions"
                      label="Nombre de missions"
                      type="number"
                    />
                  </div>

                  <div className="row">
                    <Field
                      name="prix"
                      component={Input}
                      placeholder="Prix"
                      label="Prix"
                      type="number"
                    />
                  </div>
                  <div className="row">
                    <Field
                      name="priority"
                      component={Input}
                      placeholder="Priorité"
                      label="Priorité"
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
