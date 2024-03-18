// function PrivateRoute({ component: Component, ...rest }) {
//   const isAuthenticated = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// }
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
// import Signin from "../Signin/Signin";

const useAuth = () => {
  const user = useSelector((state) => state?.user);
  if (user)
    return (
      user?.type === "ADMIN" ||
      user?.type === "STUDENT" ||
      user?.type === "SUPER_ADMIN"
    );
  else return false;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();

  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};
export default ProtectedRoute;
