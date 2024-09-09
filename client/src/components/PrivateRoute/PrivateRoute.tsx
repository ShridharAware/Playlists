import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Login />;
  }
};

export default PrivateRoute;
