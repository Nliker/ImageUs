import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Spinner from '@styles/Spinner';
import { IAuthData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';

interface IProps {
  authData: IAuthData;
}

const PublicRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading, error } = authData;

  console.log('public', isAuthenticated, loading);

  if (error) {
    const message = getErrorMessage(error);
    alert(message);
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }

  if (loading || isAuthenticated === 'init') return <Spinner />;

  return isAuthenticated === 'authorized' ? (
    <Navigate to="/select-room" />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
