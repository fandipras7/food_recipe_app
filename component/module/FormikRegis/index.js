import axios from "axios";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../base/Button";
import Input from "../../base/Input";
import Label from "../../base/Label";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password = "Min 5 Characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password and ConfirmPaswword Must be same";
  }

  return errors;
};

const RegisFormik = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
        axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, values)
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Register Success",
          });
          router.push("/Auth/Login");
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            text: "E-mail has been registered",
          });
        });
    },
  });
  console.log(formik.values);
  return (
    <div className="col-6">
      <form onSubmit={formik.handleSubmit}>
        <div className="row vh-100 align-items-center text-center justify-content-center">
          <div className="col-8 text-center">
            <h6>Let’s Get Started !</h6>
            <p>Create new account to access all features</p>
            <Label width="100%" className="text-start" title="Name"></Label>
            <Input id="name" name="name" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className="p-3" width="100%" border="1px solid #EFC81A" placeholder="Name"></Input>
            {formik.touched.name && formik.errors.name ? <div className="warning">{formik.errors.name}</div> : null}
            <Label width="100%" className="text-start" title="Email"></Label>
            <Input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} className="p-3" width="100%" border="1px solid #EFC81A" placeholder="Enter Email Address"></Input>
            {formik.touched.email && formik.errors.email ? <div className="warning">{formik.errors.email}</div> : null}
            <Label width="100%" className="text-start" title="Phone Number"></Label>
            <Input id="phoneNumber" name="phoneNumber" type="text" onChange={formik.handleChange} value={formik.values.phoneNumber} className="p-3" width="100%" border="1px solid #EFC81A" placeholder="Enter Phone Number"></Input>
            <Label width="100%" className="text-start" title="Password"></Label>
            <Input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} className="p-3" width="100%" border="1px solid #EFC81A" placeholder="Create New Password"></Input>
            {formik.touched.password && formik.errors.password ? <div className="warning">{formik.errors.password}</div> : null}
            <Label width="100%" className="text-start" title="Confirm Password"></Label>
            <Input
              id="confirmPassoword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="p-3"
              width="100%"
              border="1px solid #EFC81A"
              placeholder="Confirm Password"
            ></Input>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="warning">{formik.errors.confirmPassword}</div> : null}
            <div className="row align-items-center mt-2 mb-3">
              <div className="text-start d-flex">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                <Label width="100%" className="text-start ms-2" title="I agree to terms & conditions"></Label>
              </div>
            </div>
            <Button border="none" color="white" width="100%" backgroundColor="#EFC81A" className="p-2" title="Register Account"></Button>
            {/* <p className="text-end">Forgot Password?</p> */}
            <p className="mt-5">
              Already have account?{" "}
              <span
                onClick={() => {
                  router.push("/Auth/Login");
                }}
                style={{ cursor: "pointer" }}
              >
                Log in Here
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisFormik;
