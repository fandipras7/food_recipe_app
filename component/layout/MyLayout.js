import React from "react";
import Head from "next/head";
import Navbar from "../module/Navbar";
import Footer from "../module/Footer";

const MyLayout = ({ children, title, isAuth }) => {
  return (
    <>
      <Head>
        <title>{title || tokoku}</title>
      </Head>
      <Navbar isAuth={isAuth}></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
};

export default MyLayout;
