import React, { useState } from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

const Navbar = () => {
  const { isLogin } = useSelector((state) => state.user);
  const [cekLogin, setCekLogin] = useState(isLogin);
  const router = useRouter();

  const handleLogout = () => {
    axios
      .get(`http://localhost:4000/v1/users/logout`, { withCredentials: true })
      .then((res) => {
        alert("Anda telah Logout");
        router.push("/Auth/Login");
      })
      .catch((err) => {
        alert("error");
      });
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
