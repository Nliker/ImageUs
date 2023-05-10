import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Spinner from '@styles/Spinner';
import { CAuthData } from '@typing/client';

interface IProps {
  authData: CAuthData;
}

const PublicRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading } = authData;

  if (loading) return <Spinner />;

  return isAuthenticated ? <Navigate to="/select-room" /> : <Outlet />;
};

export default PublicRoute;
