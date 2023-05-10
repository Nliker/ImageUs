import React from 'react';
import { Navigate, Outlet } from 'react-router';
import Spinner from '@styles/Spinner';
import { CAuthData } from '@typing/client';

interface IProps {
  authData: CAuthData;
}

const PrivateRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading } = authData;

  if (loading) return <Spinner />;

  if (!isAuthenticated) {
    alert('로그인이 필요합니다.');
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
