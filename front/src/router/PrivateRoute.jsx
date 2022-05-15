import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth';

export const AuthRoute = ({type}) => {
  const auth = useAuth();
  const isAuthUser = auth?.user?.token;
  if (type === "guest" && isAuthUser) return <Navigate to="/" />;
  else if (type === "private" && !isAuthUser) return <Navigate to="/login" />
  
  return <Outlet />;
};
