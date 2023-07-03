// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";

import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import DropdownHOC from "../../../../../../_metronic/_partials/dropdowns/DropdownHOC";
import { has, isEmpty } from "lodash-es";
//import UploadInput from "../../../../../../_metronic/_partials/controls/forms/UploadInput";

export function ModeratorEditForm({
  saveModerator,
  moderator,
  actionsLoading,
  onHide,
  allows,
}) {
  let [currentAllows, setCurrentAllows] = useState();
  let [newCurrentAllows, setNewCurrentAllows] = useState();
  // Validation schema
  const ModeratorEditSchema = Yup.object().shape({
    fullName: moderator?._id
      ? Yup.mixed().optional()
      : Yup.string()
          .min(3, "Minimum 3 symbols")
          .max(50, "Maximum 50 symbols")
          .required("Nom est requis"),
    email: moderator?._id
      ? Yup.mixed().optional()
      : Yup.string()
          .email("Wrong email format")
          .min(3, "Minimum 3 symbols")
          .max(50, "Maximum 50 symbols")
          .required("Email est requis"),
    password: moderator?._id
      ? Yup.mixed().optional()
      : Yup.string()
          .min(3, "Minimum 3 symbols")
          .max(50, "Maximum 50 symbols")
          .required("Password est requis"),
    changepassword: moderator?._id
      ? Yup.mixed().optional()
      : Yup.string()
          .required("Comfirm Password est requis")
          .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Password and Confirm Password didn't match"
            ),
          }),
    tel: moderator?._id
      ? Yup.mixed().optional()
      : Yup.string().required("Telephone est requis"),
    /*   img: moderator?._id
      ? Yup.mixed().optional()
      : Yup.mixed().required("L'image est requis"),
    typeUser: Yup.string().required("Type d'utilisateur est requis"), */
  });
  const getselectedList = (data) => {
    
    let oldAllows = { menus: {}, configs: {} };
    let newAllows = { menus: {}, configs: {} };
    newCurrentAllows.map((val) => {
      oldAllows[val.type] = {
        ...oldAllows[val.type],
        [val.value]: !has(oldAllows, val.value)
          ? oldAllows[val.value]
          : val.checked
          ? val.checked
          : false,
      };
      if (!isEmpty(data)) {
        data.map((allow) => {
          if (!has(oldAllows[val.type], allow.value)) {
            oldAllows[val.type] = {
              ...oldAllows[val.type],
              [val.value]: false,
            };
            val.checked = false;
            return val;
          } else {
            oldAllows[allow.type] = {
              ...oldAllows[allow.type],
              [allow.value]: allow.checked ? allow.checked : false,
            };
          }
        });
      } else {
        oldAllows[val.type] = {
          ...oldAllows[val.type],
          [val.value]: false,
        };
        val.checked = false;
        return val;
      }
    });
    
    
    currentAllows = oldAllows;
    newCurrentAllows.map((val) => {
      val.checked = oldAllows[val.type][val.value];
      return val;
    });

    setNewCurrentAllows(newCurrentAllows);
    //setCurrentAllows(newAllows);
    
  };
  const toggleAll = (checked) => {
    /* for (var i = 0; i < marks.entities.length; i++) {
      marks.entities[i] = { ...marks.entities[i], checked: checked };
    }
    
    setMarksList(marks.entities); */
  };
  useEffect(() => {
    allows && setNewCurrentAllows(allows);
  }, [allows]);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{ ...moderator, password: "", changepassword: "" }}
        validationSchema={ModeratorEditSchema}
        onSubmit={(values) => {
          if (!currentAllows) {
            let oldAllows = { menus: {}, configs: {} };
            newCurrentAllows.map((val) => {
              oldAllows[val.type] = {
                ...oldAllows[val.type],
                [val.value]: val.checked ? val.checked : false,
              };
            });
            currentAllows = oldAllows;
          }
          values.allows = currentAllows;
          

          Object.keys(values.allows.menus).map((val) => {
            
            values.allows.menus[val] = values.allows.menus[val]
              ? values.allows.menus[val]
              : false;
          });
          Object.keys(values.allows.configs).map((val) => {
            
            values.allows.configs[val] = values.allows.configs[val]
              ? values.allows.configs[val]
              : false;
          });
          saveModerator(values);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          registerField,
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
                  {moderator?._id ? (
                    ""
                  ) : (
                    <>
                      <div className="row">
                        <Field
                          name="fullName"
                          component={Input}
                          placeholder="Nom"
                          label="Nom"
                          type="text"
                        />
                      </div>
                      <div className="row tw-pt-4">
                        <Field
                          name="tel"
                          component={Input}
                          placeholder="Telephone"
                          label="Telephone"
                          type="text"
                        />
                      </div>
                      <div className="row tw-pt-4">
                        <Field
                          name="email"
                          component={Input}
                          placeholder="Email"
                          label="Email"
                          type="text"
                        />
                      </div>
                    </>
                  )}
                  <div className="row tw-pt-4">
                    <Field
                      name="password"
                      component={Input}
                      placeholder="Password"
                      label="Password"
                      type="password"
                    />
                  </div>
                  <div className="row tw-pt-4">
                    <Field
                      name="changepassword"
                      component={Input}
                      placeholder="Confirm Password"
                      label="Confirm Password"
                      type="password"
                    />
                  </div>
                  <div className="w-full">
                    <div className="pt-2 pb-2 lg:pb-0 w-full lg:w-2/3 text-gray-700 font-medium outline-none">
                      Choisie Menus
                    </div>
                    
                    {!isEmpty(newCurrentAllows) && (
                      <>
                        <DropdownHOC
                          toggleAll={toggleAll}
                          data={newCurrentAllows}
                          getselectedList={getselectedList}
                        />
                      </>
                    )}
                  </div>
                  {/* <div className="row tw-pt-4">
                    <Field
                      name="url"
                      component={Input}
                      placeholder="Lien"
                      label="Lien"
                      type="text"
                    />
                  </div> */}
                  {/* {!moderator?._id && (
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
                  )} */}
                  {/* <div className="row">
                    <div className="tw-pt-4">Choisir type d'utilisateur</div>
                    <Field className="form-control" as="select" name="typeUser">
                      <option selected>Séléctionner type d'utilisateur</option>
                      <option value={"EXPERT"}>EXPERT</option>
                      <option value={"CLIENT"}>CLIENT</option>
                    </Field>
                    {errors.typeUser && touched.typeUser ? (
                      <div>{errors.typeUser}</div>
                    ) : null}
                  </div> */}
                  {/*  <div className="row">
                    <div className="tw-pt-4">Choisir image de Moderator</div>
                    <UploadInput
                      type="file"
                      name="img"
                      href={
                        moderator?.img
                          ? moderator?.img
                          : getFieldMeta("img").value?.name
                      }
                      placeholder="L'image de Moderator"
                      setFieldValue={setFieldValue}
                      error=""
                      errorText=""
                    />
                  </div> */}
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
