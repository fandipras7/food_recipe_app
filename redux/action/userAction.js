import axios from "axios";
import Router from "next/router";

const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    // console.log("apakah ini jalan");
    const result = await axios.post("http://localhost:4000/v1/users/login", data, { withCredentials: true });
    const user = result.data;
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
    // console.log("apakah ini jalan");
    alert("Login Success");
    // localStorage.setItem("token", user.token);
    Router.push("/Home");
  } catch (erorr) {
    alert("Login Gagal");
    console.log(erorr);
  }
};

export default login;
