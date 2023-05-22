import React from "react";
import { useNavigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";

interface RouteProps {
  children: React.ReactNode;
}

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  fallbackPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  isAdmin,
  fallbackPath,
}) => {
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
  const navigate = useNavigate();
  if (!currentUser || !currentUser.isAdmin) {
    navigate("/login");
    return null;
  }
  return <>{children}</>;
};

export default PrivateRoute;
