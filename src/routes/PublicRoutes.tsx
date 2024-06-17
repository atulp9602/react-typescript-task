import { lazy } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const PublicRoutes = () => {
  //by pass token
  const token = localStorage.getItem("token") || "true";

  console.log({ token });

  return (
    <Routes>
      <Route
        path="/"
        element={
          !!token ? (
            <Navigate to="/list" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
