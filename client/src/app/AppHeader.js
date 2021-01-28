import React from "react";
import { selectIsLoggedIn, selectIsManager } from "../selectors/userSelectors";
import { useSelector } from "react-redux";
import ResidentNavbar from "../components/Layouts/ResidentNavbar";
import NavbarCommon from "../components/Layouts/MngrNavbar";
import { useLocation } from "react-router-dom";

export const AppHeader = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isManager = useSelector(selectIsManager);
  const location = useLocation();

  if (!isLoggedIn) {
    return null;
  }

  if (location.pathname === "/") {
    return null;
  } else {
    if (isManager) {
      return <NavbarCommon />;
    }

    return <ResidentNavbar />;
  }
};
