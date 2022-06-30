import React, { useState } from "react";
import styles from "./login.module.css";
import Label from "../../component/base/Label";
import Input from "../../component/base/Input";
import Button from "../../component/base/Button";
// import { login } from "../redux/action/userAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

const Login = ({ children }) => {
  const rounter = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const hanldeLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/v1/users/login", form, { withCredentials: true })
      .then(() => {
        alert("login succes");
        rounter.push("/Home");
      })
      .catch(() => {
        alert("login gagal");
      });
  };

  console.log(form);
  return (
    <div>
      <div className="container-fluid vh-100">
        <div className="row d-flex h-100">
          <div className={"col-6 h-100"}>
            <div className={styles.bg + " position-relative"}>
              <img className="" src="/assets/img/bg_login.png" alt="" />
              <div className={styles.logo}>
                <img src="/assets/img/logo.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-6 d-flex flex-column align-items-center justify-content-center">
            <form
              onSubmit={() => {
                // hanldeLogin;
              }}
            >
              {children ? (
                children
              ) : (
                <div className="col-6 text-center">
                  <h6>Welcome</h6>
                  <p>Log in into your exiting account</p>
                  <Label width="100%" className="text-start" title="E-mail"></Label>
                  <Input
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="p-3"
                    width="100%"
                    border="1px solid #EFC81A"
                    placeholder="examplexxx@gmail.com"
                  ></Input>
                  <Label width="100%" className="text-start" title="Password"></Label>
                  <Input
                    name="password"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="p-3"
                    width="100%"
                    border="1px solid #EFC81A"
                    placeholder="Masukan password"
                  ></Input>
                  <div className="mt-4">
                    <td>
                      <input className="form-check-input text-start" type="checkbox" value="" id="flexCheckDefault" />
                    </td>
                    <td>
                      <p className="ms-2">I agree to term condition</p>
                    </td>
                  </div>
                  <Button color="white" width="100%" backgroundColor="#EFC81A" className="p-2" title="Log In"></Button>
                  <p className="text-end">Forgot Password?</p>
                  <p className="mt-5">Don’t have an account? Sign Up</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
