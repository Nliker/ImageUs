import React, { useEffect } from 'react';
import useSWR from 'swr';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';
import { logInCheckFetcher } from '@utils/logInFetcher';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Spinner from '@styles/Spinner';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const MainPage = loadable(() => import('@pages/MainPage'));
const MyPage = loadable(() => import('@pages/MyPage'));
const PeopleManagement = loadable(() => import('@pages/PeopleManagement'));
const ImageRoom = loadable(() => import('@pages/ImageRoom'));
const SocialLogInAuth = loadable(() => import('@pages/SocialLogInAuth'));

const App = () => {
  const { data: userInfo, mutate } = useSWR('/user/my');

  useEffect(() => {
    if (userInfo?.logInState === 'LoggingOut') return;
    mutate(logInCheckFetcher('/user/my'));
  }, []);

  return (
    <Routes>
      <Route index element={<MainPage fallback={<Spinner />} />} />
      <Route element={<PublicRoute />}>
        <Route path="login" element={<LogIn fallback={<Spinner />} />} />
        <Route path="signup" element={<SignUp fallback={<Spinner />} />} />
        <Route
          path="callback/oauth-login"
          element={<SocialLogInAuth fallback={<Spinner />} />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="my_page/*" element={<MyPage fallback={<Spinner />} />} />
        <Route
          path="room/:roomId"
          element={<ImageRoom fallback={<Spinner />} />}
        />
        <Route
          path="people_management/*"
          element={<PeopleManagement fallback={<Spinner />} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
