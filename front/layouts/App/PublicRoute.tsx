import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Spinner from '@styles/Spinner';
import { CAuthData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';

interface IProps {
  authData: CAuthData;
}

const PublicRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading, error } = authData;

  if (error) {
    const message = getErrorMessage(error);
    alert(message);
    return <Navigate to="/login" />;
  }

  if (loading) return <Spinner />;

  return isAuthenticated ? <Navigate to="/select-room" /> : <Outlet />;
};

export default PublicRoute;
