import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routerConfig";

function AppRouter() {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
}

export default AppRouter;
