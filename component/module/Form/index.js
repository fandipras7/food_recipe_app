import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../base/Button";
import Input from "../../base/Input";
import Label from "../../base/Label";
import login from "../../../redux/action/userAction";
import Swal from "sweetalert2";

const Form = () => {
  const dispatch = useDispatch();
  const rounter = useRouter();
  const [dataLogin, setdataLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setdataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  };
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, form, { withCredentials: true })
  //     .then( async (result) => {
  //       const token = result.data.data.token
  //       const data = {
  //         token : token
  //       }

  //       const cookie = await fetch ('/api/loginnext', {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //       })
  //       const isToken = await cookie.json()
  //       if(!isToken) {
  //         return Swal.fire(
  //           'Caution!',
  //           'Log in Failed',
  //           'error'
  //         )
  //       }
  //       Swal.fire(
  //         `Welcome ${result.data.data.name}`,
  //         `Log in Success`,
  //         'success'

  //       )
  //       // localStorage.setItem("isLogin", true);
  //       rounter.push("/Home");
  //     })
  //     .catch(() => {
  //       alert("login gagal");
  //     });
  // };
  console.log(dataLogin);
  return (
    <div className="col-6">
      <form
        // onSubmit={handleLogin}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('ini di on submit ' + dataLogin);
          dispatch(login(dataLogin));
        }}
      >
        <div className="row vh-100 align-items-center text-center justify-content-center">
          <div className="col-8 text-center">
            <h6>Welcome</h6>
            <p>Log in into your exiting account</p>
            <Label width="100%" className="text-start" title="Email"></Label>
            <Input
              value={dataLogin.email}
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
              className="p-3"
              width="100%"
              border="1px solid #EFC81A"
              placeholder="Enter Your Email"
            ></Input>
            <Label width="100%" className="text-start" title="Password"></Label>
            <Input
              type="password"
              value={dataLogin.password}
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
              className="p-3"
              width="100%"
              border="1px solid #EFC81A"
              placeholder="Enter Your Password"
            ></Input>
            <div className="row align-items-center mt-2 mb-3">
              <div className="text-start d-flex">
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                <Label width="100%" className="text-start ms-2" title="I agree to terms & conditions"></Label>
              </div>
            </div>
            <Button type="submit" border="none" color="white" width="100%" backgroundColor="#EFC81A" className="p-2" title="Log In"></Button>
            <p className="text-end">Forgot Password?</p>
            <p className="mt-5">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  rounter.push("/Auth/Register");
                }}
                style={{cursor:"pointer"}}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
