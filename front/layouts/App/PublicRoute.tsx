import Spinner from '@styles/Spinner';
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useSWR from 'swr';

const PublicRoute = () => {
  const { data: userInfo } = useSWR('/user/my');
  const loginState = userInfo?.logInState;

  if (!loginState) return <Spinner />;

  return loginState === 'LoggedIn' ? (
    <Navigate to="/room-select" />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
