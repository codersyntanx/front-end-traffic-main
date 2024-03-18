import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
// import Signin from "../Signin/Signin";

const useAuth = () => {
  const user = useSelector((state) => state?.user);
  if (user) return user?.type === "SUPER_ADMIN";
  else return false;
};

const SuperAdminRoutes = () => {
  const isAuth = useAuth();

  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};
export default SuperAdminRoutes;
