import React from "react";
import {useField, useFormikContext} from "formik";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

export function FileChooser({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <input
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        style={{ width: "100%" }}
        {...field}
        {...props}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
      />
      {errors[field.name] && touched[field.name] ? (
        <div className="invalid-datepicker-feedback">
          {errors[field.name].toString()}
        </div>
      ) : (
        <div className="feedback">
          Please enter a valid file
        </div>
      )}
    </>
  );
}
