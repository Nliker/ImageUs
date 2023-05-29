import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { CAuthData, ILoginData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';
import Spinner from '@styles/Spinner';

interface IProps {
  authData: CAuthData;
}

const PrivateRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading, error, userInfo } = authData;

  console.log('private', isAuthenticated, loading, error);

  if (error) {
    error.name = 'AuthError';
    throw error;
  }

  if (loading || isAuthenticated === 'init') return <Spinner />;

  if (isAuthenticated === 'unauthorized') {
    alert('..로그인이 필요합니다. 확인');
    return <Navigate to="/login" />;
  } else {
    return <Outlet context={{ userInfo }} />;
  }
};

export default PrivateRoute;
