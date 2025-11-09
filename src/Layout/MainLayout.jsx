import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Outlet, ScrollRestoration } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
      <ToastContainer />
      <ScrollRestoration />
    </>
  );
};

export default MainLayout;
