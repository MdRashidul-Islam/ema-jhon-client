import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../shared/Spinner";

const AdminRoute = ({ children, ...rest }) => {
  const { user, admin, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <Spinner />;
  }
  if (!admin) {
    return <Spinner />;
  }
  if (user.email && admin) {
    return children;
  }
  return <Navigate to="home" state={{ from: location }} />;
};

export default AdminRoute;
