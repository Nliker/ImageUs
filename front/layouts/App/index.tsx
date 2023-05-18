import React, { useMemo } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import loadable from '@loadable/component';
import useAuth from '@hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CheckRoomId from './CheckRoomId';
import NotFound from '@components/NotFound';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Intro = loadable(() => import('@pages/Intro'));
const SelectRoom = loadable(() => import('@pages/SelectRoom'));
const MyPage = loadable(() => import('@pages/MyPage'));
const PeopleManagement = loadable(() => import('@pages/PeopleManagement'));
const ImageRoom = loadable(() => import('@pages/ImageRoom'));
const SocialLogInAuth = loadable(() => import('@pages/SocialLogInAuth'));

function App() {
  const { isAuthenticated, loading, userInfo, error, refreshAuthData } =
    useAuth();

  const authData = useMemo(
    () => ({ isAuthenticated, loading, error }),
    [isAuthenticated, loading, error],
  );

  console.log('app 확인', isAuthenticated, loading);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<PublicRoute authData={authData} />}>
          <Route index element={<Intro />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="callback/oauth-login" element={<SocialLogInAuth />} />
        </Route>
        <Route element={<PrivateRoute authData={authData} />}>
          <Route path="select-room" element={<SelectRoom />} />
          <Route path="my_page/*" element={<MyPage userInfo={userInfo} />} />
          <Route path="room/:roomId" element={<CheckRoomId />}>
            <Route index element={<ImageRoom />} />
          </Route>
          <Route path="people_management/*" element={<PeopleManagement />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
