import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes({ loggedIn, path = '/signin' }) {

  return loggedIn
    ? <Outlet />
    : <Navigate to={path} />
}

export default ProtectedRoutes;
