import React, { useEffect, useMemo } from 'react';
import useSWR from 'swr';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';
import { logInCheckFetcher } from '@utils/logInFetcher';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Spinner from '@styles/Spinner';
import useAuth from '@hooks/useAuth';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Intro = loadable(() => import('@pages/Intro'));
const SelectRoom = loadable(() => import('@pages/SelectRoom'));
const MyPage = loadable(() => import('@pages/MyPage'));
const PeopleManagement = loadable(() => import('@pages/PeopleManagement'));
const ImageRoom = loadable(() => import('@pages/ImageRoom'));
const SocialLogInAuth = loadable(() => import('@pages/SocialLogInAuth'));

const App = () => {
  // const { data: userInfo, mutate } = useSWR('/user/my');

  // useEffect(() => {
  //   if (userInfo?.logInState === 'LoggingOut') return;
  //   mutate(logInCheckFetcher('/user/my'));
  // }, []);
  const { isAuthenticated, loading } = useAuth();

  const authData = useMemo(
    () => ({ isAuthenticated, loading }),
    [isAuthenticated, loading],
  );

  console.log('로그인 정보: ', isAuthenticated, loading);

  return (
    <Routes>
      <Route element={<PublicRoute authData={authData} />}>
        <Route index element={<Intro />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="callback/oauth-login" element={<SocialLogInAuth />} />
      </Route>
      <Route element={<PrivateRoute authData={authData} />}>
        <Route path="select-room" element={<SelectRoom />} />
        <Route path="my_page/*" element={<MyPage />} />
        <Route path="room/:roomId" element={<ImageRoom />} />
        <Route path="people_management/*" element={<PeopleManagement />} />
      </Route>
      <Route path="*" element={<div>404 페이지</div>} />
    </Routes>
  );
};

export default App;
