
import React, { useState } from "react";
import "./SignUpForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUp } from "./UserApi";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [data, setData] = useState(null);
  const navigate = useNavigate()
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await signUp(values);
      setData(response);
      if(response.status){
        navigate("/signIn");
      }
      if(response.message === "User already exists")
      console.log("Form Data", response);
      resetForm();
    } catch (error) {
      console.log("Error in form submission", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required:"),
    email: Yup.string().required("Required!"),
    password: Yup.string().required("Required!!"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <div className="page-wrapper">
            <div className="SignUp-container">
              <Form>
                <h2>SignUp</h2>
                <div className="form-control">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="login-input"
                  />
                  <ErrorMessage name="name" />
                </div>

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
                <button type="submit" className="SignUp-button" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "SignUp"}
                </button>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default SignUpForm;
