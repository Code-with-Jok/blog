import { Outlet } from "react-router-dom";

type PrivateRouteProps = {
  allowedRoles: "admin" | "user";
};

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  return <Outlet />;
};

export default PrivateRoute;
