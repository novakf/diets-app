import React from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Layout from "./Layout";

const AppRouter = () => {
  return (
    <Routes>
      {authRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
          exact
        />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
          exact
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
