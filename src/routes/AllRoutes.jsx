import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../hoc/AuthContext";
import { Home } from "../pages/Home";
import { Portal } from "../pages/portal/Portal";
import { Dashborad } from "../pages/portal/Dashborad";
import { Orders } from "../pages/portal/Orders";
import { Quotes } from "../pages/portal/Quotes";
import { Retailers } from "../pages/portal/Retailers";
import { Account } from "../pages/portal/Account";
import { DigitalAssets } from "../pages/DigitalAssets";
import { Modal } from "@chakra-ui/react";
import { Models } from "../pages/Models";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Home />} path={"/"} />
      <Route element={<Portal />} path="/portal" />
      <Route element={<Dashborad />} path="/portal/dashboard" />
      <Route element={<Orders />} path="/portal/orders" />
      <Route element={<Quotes />} path="/portal/quotes" />
      <Route element={<Retailers />} path="/portal/retailers" />
      <Route element={<Account/>} path="/portal/account" />
      <Route  element={<DigitalAssets/>} path="/digital-assets"/>
      <Route element={<Models/>} path="/models"/>
    </Routes>
  );
};
