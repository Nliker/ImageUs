import useAuth from '@hooks/useAuth';
import Spinner from '@styles/Spinner';
import { CAuthData } from '@typing/client';
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useSWR from 'swr';

interface IProps {
  authData: CAuthData;
}

const PrivateRoute = ({ authData }: IProps) => {
  // const { data: userInfo } = useSWR('/user/my');
  // const loginState = userInfo?.logInState;

  // if (!loginState || loginState === 'LoggingOut') {
  //   return <Spinner />;
  // }
  // const { isAuthenticated, loading } = useAuth();

  const { isAuthenticated, loading } = authData;

  // console.log('로그인 정보: ', isAuthenticated, loading);

  if (loading) return <Spinner />;

  if (!isAuthenticated) {
    alert('로그인이 필요합니다.');
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
