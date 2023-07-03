// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";

import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

// Validation schema
const ClientEditSchema = Yup.object().shape({
});

export function ClientEditForm({ saveClient, client, actionsLoading, onHide }) {
  const [status, setStatus] = useState(0);
  const [verfied, setVerfied] = useState(false);

  useEffect(() => {
    client.status === 0
      ? setStatus(0)
      : client.status === 1
      ? setStatus(1)
      : setStatus(2);
    client.isVerified ? setVerfied(true) : setVerfied(false);
  }, [client]);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={client}
        validationSchema={ClientEditSchema}
        onSubmit={(values) => {
          saveClient(values);
        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {actionsLoading && <ModalProgressBar />}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* network */}
                  <div className="col-lg">
                    <Select
                      name="status"
                      value={status}
                      onChange={(e) => {
                        setStatus(parseInt(e.target.value));
                        setFieldValue(
                          "status",
                          JSON.parse(parseInt(e.target.value))
                        );
                      }}
                      label="Etat du compte"
                    >
                      <option key="1" value="1">
                        Active
                      </option>
                      <option key="2" value="2">
                        Banni(e)
                      </option>
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg">
                    <Select
                      name="isVerified"
                      value={verfied}
                      onChange={(e) => {
                        setVerfied(e.target.value);
                        setFieldValue("isVerified", JSON.parse(e.target.value));
                      }}
                      label="Email Verification"
                    >
                      <option key="Verfied" value="true">
                        Vérifié
                      </option>
                      <option key="Unverified" value="false">
                        Non vérifié
                      </option>
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
