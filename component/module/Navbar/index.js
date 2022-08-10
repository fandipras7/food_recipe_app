import React, { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

const Navbar = ({isAuth}) => {
  const { isLogin } = useSelector((state) => state.user);
  // const [cekLogin, setCekLogin] = useState(isLogin);
  const [cekLogin, setCekLogin] = useState(isAuth);
  const router = useRouter();

  const handleLogout = async () => {
    // axios
    //   .get(`http://localhost:4000/v1/users/logout`, { withCredentials: true })
    //   .then((res) => {
    //     alert("Anda telah Logout");
    //     router.push("/Auth/Login");
    //   })
    //   .catch((err) => {
    //     alert("error");
    //   });

    // coba pake api logout
    try {
      const result = await fetch('api/logout')
      const{ logout } = await result.json()
      if (logout) {
        Swal.fire(
          'Success',
          'User Logout',
          'success'
        )
        router.push('/Auth/Login')
      }
    } catch (error) {
      console.log(error)
    }


  };
  return (
    <nav className={styles.navbar}>
      <div className="container-fluid">
        <div className="col d-flex">
          <ul className={styles.links}>
            <Link href="/Home">
              <li>Home</li>
            </Link>
            <Link href="/AddRecipe">
              <li>Add Recipe</li>
            </Link>
            <Link href="/Profile">
              <li>Profile</li>
            </Link>
          </ul>
          <ul className={styles.links_dua}>
            {cekLogin ? (
              <li onClick={handleLogout}>Logout</li>
            ) : (
              <Link href="/Auth/Login">
                <li>Login</li>
              </Link>
            )}
          </ul>
        </div>
        {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">
              Home
            </a>
            <a className="nav-link" href="#">
              Features
            </a>
            <a className="nav-link" href="#">
              Pricing
            </a>
            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
              Disabled
            </a>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
