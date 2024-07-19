import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashborad } from "../pages/portal/Dashborad";
import { Orders } from "../pages/portal/Orders";
import { Quotes } from "../pages/portal/Quotes";
import { Retailers } from "../pages/portal/Retailers";
import { Account } from "../pages/portal/Account";

export const PortalRoutes = () => {
  return (
    <Routes>
      <Route path="/portal/dashboard" element={<Dashborad />} />
      <Route path="/portal/orders" element={<Orders />} />
      <Route path="/portal/quotes" element={<Quotes />} />
      <Route path="/portal/retailers" element={<Retailers />} />
      <Route path="/portal/account" element={<Account />} />
      <Route path="/portal" element={<Navigate to="/portal/dashboard" />} />
    </Routes>
  );
};
