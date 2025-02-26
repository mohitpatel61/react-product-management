import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container mt-5">
        <Outlet /> {/* ✅ This will render /dashboard correctly */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
