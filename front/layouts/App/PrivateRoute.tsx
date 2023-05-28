import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { CAuthData } from '@typing/client';
import AppLayout from '@layouts/AppLayout';
import { GlobalErrorBoundary } from '@components/ErrorBoundary';
import { getErrorMessage } from '@utils/getErrorMessage';
import Spinner from '@styles/Spinner';
import withErrorBoundary from '@layouts/ErrorBoundary';
import { DUserInfo } from '@typing/db';

interface IProps {
  authData: CAuthData;
}

// interface IPrivatePage {}

const PrivateRoute = ({ authData }: IProps) => {
  // const location = useLocation();
  // const currentPage = location.pathname.split('/')[1];
  const { isAuthenticated, loading, error, userInfo } = authData;

  console.log('private', isAuthenticated, loading, userInfo);

  if (error) {
    const message = getErrorMessage(error);
    alert(message);
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }

  if (loading || isAuthenticated === 'init') return <Spinner />;

  if (isAuthenticated === 'unauthorized') {
    alert('..로그인이 필요합니다. 확인');
    return <Navigate to="/login" />;
  } else {
    // const privateRouteOutlet = <Outlet context={{ userInfo }} />;
    // return withErrorBoundary(privateRouteOutlet);

    return <Outlet context={{ userInfo }} />;
  }
  // return <Outlet context={{ userInfo }} />;
};

export default PrivateRoute;
