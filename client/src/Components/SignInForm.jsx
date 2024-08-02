import React from 'react';
import "./SignInForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from './UserApi';
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await signIn(values);
      if (response.status) {
        localStorage.setItem('token', response.token); 
        navigate("/");
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required!"),
    password: Yup.string().required("Required!!"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <div className="page-wrapper">
            <div className="SignIn-container">
              <Form>
                <h2>SignIn</h2>
                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="login-input"
                  />
                  <ErrorMessage name="email" component={"div"} />
                </div>

                <div className="form-control">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="login-input"
                  />
                  <ErrorMessage name="password" />
                </div>
                <button
                  type="submit"
                  className="SignIn-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "SignIn"}
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default SignInForm;
