import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import PrivateRoute from "./PrivateRoute";
import ProductList from "../pages/Product/ProductList";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import ChangePassword from "../pages/ChangePassword";
import ProfileMain from "../pages/Profile/ProfileMain";


const AppRoutes = () => {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes (Require Authentication) */}
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/profile" element={<ProfileMain />} />
            <Route path="/logout"></Route>
            <Route path="/change-password" element={<ChangePassword/>}></Route>
          </Route>
        </Route>
      </Routes>
  );
};

export default AppRoutes;
