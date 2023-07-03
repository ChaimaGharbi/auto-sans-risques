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
import UploadInput from "../../../../../../_metronic/_partials/controls/forms/UploadInput";

export function AdEditForm({ saveAd, ad, actionsLoading, onHide }) {
  // Validation schema
  const AdEditSchema = Yup.object().shape({
    title: Yup.string().required("Titre est requis"),
    body: Yup.string().required("Content est requis"),
    img: ad._id
      ? Yup.mixed().optional()
      : Yup.mixed().required("L'image est requis"),
    typeUser: Yup.string().required("Type d'utilisateur est requis"),
  });
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ad}
        validationSchema={AdEditSchema}
        onSubmit={(values) => {
          
          saveAd(values);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          handleBlur,
          getFieldMeta,
          values,
          errors,
          touched,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && <ModalProgressBar />}
              <Form className="form form-label-right">
                <div className="form-group">
                  {/* Shared Key */}
                  <div className="row">
                    <Field
                      name="title"
                      component={Input}
                      placeholder="titre"
                      label="titre"
                      type="text"
                    />
                  </div>

                  <div className="row tw-pt-4">
                    <Field
                      name="body"
                      component={Input}
                      placeholder="Contenu"
                      label="Contenu"
                      type="text"
                    />
                  </div>
                  <div className="row tw-pt-4">
                    <Field
                      name="url"
                      component={Input}
                      placeholder="Lien"
                      label="Lien"
                      type="text"
                    />
                  </div>
                  {!ad._id && (
                    <>
                      <div className="row tw-pt-4">
                        <Field
                          name="adresse"
                          component={Input}
                          placeholder="Adresse"
                          label="Adresse"
                          type="text"
                        />
                      </div>
                      <div className="row tw-pt-4">
                        <Field
                          name="ville"
                          component={Input}
                          placeholder="Ville"
                          label="Ville"
                          type="text"
                        />
                      </div>
                    </>
                  )}
                  <div className="row">
                    <div className="tw-pt-4">Choisir type d'utilisateur</div>
                    <Field className="form-control" as="select" name="typeUser">
                      <option selected>Séléctionner type d'utilisateur</option>
                      <option value={"EXPERT"}>EXPERT</option>
                      <option value={"CLIENT"}>CLIENT</option>
                    </Field>
                    {errors.typeUser && touched.typeUser ? (
                      <div>{errors.typeUser}</div>
                    ) : null}
                  </div>
                  <div className="row">
                    <div className="tw-pt-4">Choisir image de banniére</div>
                    <UploadInput
                      type="file"
                      name="img"
                      href={ad.img ? ad.img : getFieldMeta("img").value?.name}
                      placeholder="L'image de banniére"
                      setFieldValue={setFieldValue}
                      error=""
                      errorText=""
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
