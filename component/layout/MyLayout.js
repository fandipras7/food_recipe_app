import React from "react";
import Head from "next/head";
import Navbar from "../module/Navbar";
import Footer from "../module/Footer";

const MyLayout = ({ children, title, }) => {
  return (
    <>
      <Head>
        <title>{title || tokoku}</title>
      </Head>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </>
  );
};

export default MyLayout;
