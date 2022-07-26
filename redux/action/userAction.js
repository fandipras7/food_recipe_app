import axios from "axios";
import Router from "next/router";
import Swal from "sweetalert2";

// const login = (data) => async (dispatch) => {
//   try {
//     dispatch({ type: "USER_LOGIN_PENDING" });
//     // console.log("apakah ini jalan");
//     const result = await axios.post("http://localhost:4000/v1/users/login", data, { withCredentials: true });
//     const user = result.data;
//     dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });
//     // console.log("apakah ini jalan");
//     alert("Login Success");
//     // localStorage.setItem("token", user.token);
//     Router.push("/Home");
//   } catch (erorr) {
//     alert("Login Gagal");
//     console.log(erorr);
//   }
// };

const login = (dataLogin) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    console.log("apakah ini jalan");
    console.log(data);
    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, dataLogin, { withCredentials: true });
    const token = result.data.data.token;
    localStorage.setItem("token", token);
    console.log('apakah ini jaln');
    const data = {
      token: token,
    };

    const cookie = await fetch("/api/loginnext", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const isToken = await cookie.json();
    if (!isToken) {
      return Swal.fire("Caution!", "Log in Failed", "error");
    }
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: result.data });
    Swal.fire(`Welcome ${result.data.data.name}`, `Log in Success`, "success");
    // localStorage.setItem("isLogin", true);

    Router.push("/Home");
  } catch (erorr) {
    console.log(erorr);
  }
};

export default login;
