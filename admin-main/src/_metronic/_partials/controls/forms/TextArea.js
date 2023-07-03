import React from "react";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";

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

export function TextArea({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  row="4",
  ...props
}) {
  return (
    <>
      {label && <label>Enter {label}</label>}
      <textarea
        style={{height: "100px"}}
        row={row}
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        {...field}
        {...props}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          row={row}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
