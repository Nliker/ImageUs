import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Spinner from '@styles/Spinner';
import { CAuthData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';

interface IProps {
  authData: CAuthData;
}

const PrivateRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading, error } = authData;

  if (error) {
    const message = getErrorMessage(error);
    alert(message);
    return <Navigate to="/login" />;
  }

  if (loading) return <Spinner />;

  if (!isAuthenticated) {
    alert('..로그인이 필요합니다.');
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
