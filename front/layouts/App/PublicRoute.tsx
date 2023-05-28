import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import Spinner from '@styles/Spinner';
import { CAuthData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';
import { GlobalErrorBoundary } from '@components/ErrorBoundary';
import withErrorBoundary from '@layouts/ErrorBoundary';

interface IProps {
  authData: CAuthData;
}

const PublicRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading, error } = authData;

  if (error) {
    const message = getErrorMessage(error);
    alert(message);
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }

  console.log('public', isAuthenticated, loading);

  if (loading || isAuthenticated === 'init') return <Spinner />;

  return isAuthenticated === 'authorized' ? (
    <Navigate to="/select-room" />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
