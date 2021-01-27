import React from "react";
import { selectIsLoggedIn, selectIsManager } from "../selectors/userSelectors";
import { useSelector } from "react-redux";
import ResidentNavbar from "../components/Layouts/ResidentNavbar";
import NavbarCommon from "../components/Layouts/MngrNavbar";

export const AppHeader = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isManager = useSelector(selectIsManager);

  if (!isLoggedIn) {
    return null;
  }

  if (isManager) {
    return <NavbarCommon />;
  }

  return <ResidentNavbar />;
};
