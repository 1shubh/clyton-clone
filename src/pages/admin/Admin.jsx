import React, { useContext } from "react";
import { AuthContext } from "../../hoc/AuthContext";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export const Admin = () => {
  const { adminAuthState } = useContext(AuthContext);
  return adminAuthState.isAuth ? <AdminDashboard /> : <AdminLogin />;
};
