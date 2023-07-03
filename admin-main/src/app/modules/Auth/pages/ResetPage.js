import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { resetPassword, verifyToken } from "../_redux/authCrud";
import ErrorDiv from "../../../../_metronic/_partials/controls/ErrorDiv";

const initialValues = {
  password: "",
  confirmpassword: "",
};

function ResetPage(props) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const passResetToken = useParams().token;
  

  useEffect(() => {
    function verifyToken1() {
      try {
        if (passResetToken) {
          verifyToken(passResetToken);
        }
      } catch (err) {
        
      }
    }
    verifyToken1();
  }, []);

  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);
  const ResetPageSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    confirmpassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ResetPageSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      resetPassword(passResetToken, values.password, values.confirmpassword)
        .then(() => {
          disableLoading();
          setStatus(
            intl.formatMessage(
              { id: "AUTH.FORGOT.SUCCESS" },
              { name: values.email }
            )
          );
          setTimeout(()=>{
            history.push('/auth');
          },1000);
        })
        .catch(() => {
          disableLoading();
          setStatus(
            intl.formatMessage(
              { id: "AUTH.FORGOT.FAILED" },
              { name: values.email }
            )
          );
          setSubmitting(false);
        });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Reset Password </h3>
            <div className="text-muted font-weight-bold"></div>
          </div>
          {error && <ErrorDiv>{error}</ErrorDiv>}
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}
            <div className="form-group fv-plugins-icon-container">
              <input
                type="password"
                placeholder="New Password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.password}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                type="password"
                placeholder="Confirm Password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "confirmpassword"
                )}`}
                name="confirmpassword"
                {...formik.getFieldProps("confirmpassword")}
              />
              {formik.touched.confirmpassword &&
              formik.errors.confirmpassword ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.confirmpassword}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ResetPage));
