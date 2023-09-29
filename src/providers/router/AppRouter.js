import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, loginRoutes, publicRoutes } from "./routerConfig";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/user/userSelectors";
import { MAIN_PAGE } from "./routes";

function AppRouter() {
  const user = useSelector(userSelector);

  const createRoutes = (routesArr, condition, redirectTo) =>
    routesArr.map(({ path, Component }) => (
      <Route
        key={path}
        path={path}
        element={
          condition ? (
            <Component />
          ) : (
            <Navigate to={redirectTo} replace={true} />
          )
        }
      />
    ));

  return (<Routes>
    {createRoutes(authRoutes, user, MAIN_PAGE)}
    {createRoutes(loginRoutes, !user, MAIN_PAGE)}
    {createRoutes(publicRoutes, true)}
  </Routes>);
}

export default AppRouter;
