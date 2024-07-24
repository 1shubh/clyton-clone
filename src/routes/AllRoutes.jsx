import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../hoc/AuthContext";
import { Home } from "../pages/Home";

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

      <Route element={<Dashborad />} path="/dashboard" />
      <Route element={<Orders />} path="/orders" />
      <Route element={<Quotes />} path="/quotes" />
      <Route element={<Retailers />} path="/retailers" />
      <Route element={<Account/>} path="/account" />
      <Route  element={<DigitalAssets/>} path="/digital-assets"/>
      <Route element={<Models/>} path="/models"/>
    </Routes>
  );
};
