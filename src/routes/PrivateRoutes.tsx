import React, { FC, lazy } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
const List = lazy(() => import("../pages/List"));
const Profile = lazy(() => import("../pages/Profile"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const ProtectedRoutes: FC = () => {
  const token: string | null = localStorage.getItem("token") || "true";
  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
};

const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to="/listing" />} />
        <Route path="/listing" element={<List />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Navigate to={"/listing"} />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
