import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import Spinner from '@styles/Spinner';
import { CAuthData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';
import AppLayout from '@layouts/AppLayout';

interface IProps {
  authData: CAuthData;
}

const PrivateRoute = ({ authData }: IProps) => {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1];
  const { isAuthenticated, loading, error } = authData;

  if (error) {
    const message = getErrorMessage(error);
    alert(message);
    return <Navigate to="/login" />;
  }

  console.log('private', isAuthenticated, loading);

  if (loading || isAuthenticated === 'init') return <Spinner />;

  if (isAuthenticated === 'unauthorized') {
    alert('..로그인이 필요합니다.');
    return <Navigate to="/login" />;
  } else {
    return (
      <AppLayout isImageRoom={currentPage === 'room'}>
        <Outlet />;
      </AppLayout>
    );
  }
};

export default PrivateRoute;
