import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../views/components/custom/Spinner";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();
  let location = useLocation();
  if (isLoading) {
    return <Spinner />;
  }
  if (user.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
