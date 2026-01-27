import { useUserContext } from "@/context/UserContextDefinition";
import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
  allowedRoles: ["admin" | "member"];
};

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const context = useUserContext();

  if (!context) {
    return null;
  }

  const { user, loading } = context;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
