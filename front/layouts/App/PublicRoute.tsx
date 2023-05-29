import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { PageLoading } from '@styles/Spinner';
import { IAuthData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';

interface IProps {
  authData: IAuthData;
}

const PublicRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading, error } = authData;

  if (error) {
    const message = getErrorMessage(error);
    alert(message);
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }

  if (loading || isAuthenticated === 'init') return <PageLoading />;

  return isAuthenticated === 'authorized' ? (
    <Navigate to="/select-room" />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
