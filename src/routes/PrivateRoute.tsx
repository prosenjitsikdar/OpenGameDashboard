import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Url } from './Routes';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // Wait for auth check

  return isAuthenticated ? <Outlet /> : <Navigate to={Url.Login} replace />;
};

export default PrivateRoute;