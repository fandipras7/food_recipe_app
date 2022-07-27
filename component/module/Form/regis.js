import axios from "axios";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../base/Button";
import Input from "../../base/Input";
import Label from "../../base/Label";

const RegisForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const hanldeLogin = (e) => {
    if (form.password === form.confirmPassword) {
      delete form.confirmPassword;
      e.preventDefault();
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, form)
        .then(() => {
          alert("Register succes");
          router.push("/Auth/Login");
        })
        .catch(() => {
          alert("Register gagal");
        });
    } else {
      alert("Konfirmasi password tidak sama");
    }
  };
  console.log(form);
  return (
    <div className="col-6">
      <form onSubmit={hanldeLogin}>
        <div className="row vh-100 align-items-center text-center justify-content-center">
          <div className="col-8 text-center">
            <h6>Let’s Get Started !</h6>
            <p>Create new account to access all features</p>
            <Label width="100%" className="text-start" title="Name"></Label>
            <Input
              value={form.name}
              name="name"
              onChange={(e) => {
                handleChange(e);
              }}
              className="p-3"
              width="100%"
              border="1px solid #EFC81A"
              placeholder="Name"
            ></Input>
            <Label width="100%" className="text-start" title="E-mail"></Label>
            <Input
              value={form.email}
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
              className="p-3"
              width="100%"
              border="1px solid #EFC81A"
              placeholder="Enter Email Address"
            ></Input>
            <Label width="100%" className="text-start" title="Phone Number"></Label>
            <Input
              value={form.phoneNumber}
              name="phoneNumber"
              onChange={(e) => {
                handleChange(e);
              }}
              className="p-3"
              width="100%"
              border="1px solid #EFC81A"
              placeholder="08123813192"
            ></Input>
            <Label width="100%" className="text-start" title="Password"></Label>
            <Input
              value={form.password}
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
              className="p-3"
              width="100%"
              border="1px solid #EFC81A"
              placeholder="Create New Passowrd"
            ></Input>
            <Label width="100%" className="text-start" title="Confirm Paswword"></Label>
            <Input
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={(e) => {
                handleChange(e);
              }}
              className="p-3"
              width="100%"
              border="1px solid #EFC81A"
              placeholder="Confirm Password"
            ></Input>
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

export default RegisForm;
