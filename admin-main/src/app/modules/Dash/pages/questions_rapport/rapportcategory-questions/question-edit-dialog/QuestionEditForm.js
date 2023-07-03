// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with question first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useCallback, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
} from "../../../../../../../_metronic/_partials/controls";
import DynamicInput from "./DynamicInput";
// Validation schema

export function QuestionEditForm({
  saveQuestion,
  question,
  actionsLoading,
  onHide,
}) {
  const [colors, setColors] = useState([]);
  const QuestionEditSchema = Yup.object().shape({
    question: Yup.string()
      .min(2, "Minimum 2 symboles")
      .max(200, "Maximum 200 symboles")
      .required("La question est obligatoire"),
    typeInput: Yup.string().required("Type de champ est obligatoire"),
    choices: Yup.string().required(""),
  });

  const choices = useMemo(() => {
    return question.choices
      ? question.choices.map((choice) => ({ choice }))
      : [];
  }, [question.choices]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={question}
        validationSchema={QuestionEditSchema}
        onSubmit={(values) => {
          saveQuestion({ ...values, colors });
        }}
      >
        {({ handleSubmit, setFieldValue, setFieldError, errors }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Field
                      name="question"
                      component={Input}
                      placeholder="La question"
                      label="La question"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <DynamicInput
                      label="Les Choix de question"
                      type="text"
                      name="choices"
                      colors={question.colors}
                      defaultValues={choices}
                      setFieldValue={setFieldValue}
                      setFieldError={setFieldError}
                      placeholder="Choix"
                      error={errors.choices}
                      errorText="Ce champ est requis"
                      onColorsChanged={setColors}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <Select name="typeInput" label="Type de champ">
                      {["Text", "date"].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
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
