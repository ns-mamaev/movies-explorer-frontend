import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ProtectedRoute({ component: Component, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  return currentUser
    ? (<Component {...props} />)
    : <Navigate to='/' />
}

export default ProtectedRoute
