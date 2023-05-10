import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import useAuth from '@hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Intro = loadable(() => import('@pages/Intro'));
const SelectRoom = loadable(() => import('@pages/SelectRoom'));
const MyPage = loadable(() => import('@pages/MyPage'));
const PeopleManagement = loadable(() => import('@pages/PeopleManagement'));
const ImageRoom = loadable(() => import('@pages/ImageRoom'));
const SocialLogInAuth = loadable(() => import('@pages/SocialLogInAuth'));

const App = () => {
  const { isAuthenticated, loading, userInfo, error } = useAuth();

  const authData = useMemo(
    () => ({ isAuthenticated, loading, error }),
    [isAuthenticated, loading],
  );

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
        <Route path="my_page/*" element={<MyPage userInfo={userInfo} />} />
        <Route path="room/:roomId" element={<ImageRoom />} />
        <Route path="people_management/*" element={<PeopleManagement />} />
      </Route>
      <Route path="*" element={<div>404 페이지</div>} />
    </Routes>
  );
};

export default App;
