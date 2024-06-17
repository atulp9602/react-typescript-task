import React, { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import LoadingResponsePage from "./pages/LoadingResponsePage";
import { PrivateRoutes, PublicRoutes } from "./routes";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingResponsePage />}>
        <Routes>
          <Route path="/*" element={<PrivateRoutes />} />
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
