import Spinner from '@styles/Spinner';
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useSWR from 'swr';

const PrivateRoute = () => {
  const { data: userInfo } = useSWR('/user/my');
  const loginState = userInfo?.logInState;

  if (!loginState || loginState === 'LoggingOut') {
    return <Spinner />;
  }

  if (loginState === 'LoggedOut') {
    alert('로그인이 필요합니다.');
  }

  return loginState === 'LoggedIn' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
