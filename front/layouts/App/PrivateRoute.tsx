import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { IAuthData } from '@typing/client';
import { PageLoading } from '@styles/Spinner';
import AppLayout from '@layouts/AppLayout';
import UserInfoContext from '@hooks/UserInfoContext';

interface IProps {
  authData: IAuthData;
}

const PrivateRoute = ({ authData }: IProps) => {
  const { isAuthenticated, loading, error, userInfo } = authData;

  if (loading || isAuthenticated === 'init') return <PageLoading />;

  if (error) {
    error.name = 'AuthError';
    throw error;
  } else if (!userInfo) {
    const error = new Error('로그인 정보가 없습니다.. 다시 로그인 하세요.');
    error.name = 'AuthError';
    throw error;
  }

  if (isAuthenticated === 'unauthorized') {
    alert('로그인이 필요합니다...');
    return <Navigate to="/login" />;
  } else {
    return (
      <UserInfoContext.Provider value={{ userInfo }}>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </UserInfoContext.Provider>
    );
  }
};

export default PrivateRoute;
