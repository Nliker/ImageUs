import useAuth from '@hooks/useAuth';
import Spinner from '@styles/Spinner';
import { CAuthData } from '@typing/client';
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useSWR from 'swr';

interface IProps {
  authData: CAuthData;
}

const PublicRoute = ({ authData }: IProps) => {
  // const { data: userInfo } = useSWR('/user/my');
  // const loginState = userInfo?.logInState;
  // const { isAuthenticated, loading } = useAuth();

  const { isAuthenticated, loading } = authData;

  if (loading) return <Spinner />;

  return isAuthenticated ? <Navigate to="/select-room" /> : <Outlet />;
};

export default PublicRoute;
