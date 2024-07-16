import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../hoc/AuthContext";
import { Home } from "../pages/Home";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path={"/"} />
    </Routes>
  );
};
