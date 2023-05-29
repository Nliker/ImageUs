import React, { useMemo, useEffect, useRef } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import loadable from '@loadable/component';
import useAuth from '@hooks/useAuth';
import { NotFoundPage } from '@components/ErrorComponent';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CheckRoomId from './CheckRoomId';
import ErrorBoundary from '@components/ErrorBoundary';
import { Spinner } from '@styles/Spinner';

const LogIn = loadable(() => import('@pages/LogIn'), {
  fallback: <Spinner />,
});
const SignUp = loadable(() => import('@pages/SignUp'), {
  fallback: <div>Loading...</div>,
});
const Intro = loadable(() => import('@pages/Intro'), {
  fallback: <div>Loading...</div>,
});
const SelectRoom = loadable(() => import('@pages/SelectRoom'), {
  fallback: <div>Loading...</div>,
});
const MyPage = loadable(() => import('@pages/MyPage'), {
  fallback: <div>Loading...</div>,
});
const PeopleManagement = loadable(() => import('@pages/PeopleManagement'), {
  fallback: <div>Loading...</div>,
});
const ImageRoom = loadable(() => import('@pages/ImageRoom'), {
  fallback: <div>Loading...</div>,
});
const SocialLogInAuth = loadable(() => import('@pages/SocialLogInAuth'), {
  fallback: <div>Loading...</div>,
});

function App() {
  const effectRun = useRef(false);
  const { isAuthenticated, loading, userInfo, error, refreshAuthData } =
    useAuth();

  const authData = useMemo(
    () => ({ isAuthenticated, loading, error, userInfo }),
    [isAuthenticated, loading, error, userInfo],
  );

  useEffect(() => {
    if (effectRun.current === false) {
      refreshAuthData();
    }

    return () => {
      effectRun.current = true;
    };
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorBoundary />}>
        <Route element={<PublicRoute authData={authData} />}>
          <Route index element={<Intro />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="callback/oauth-login" element={<SocialLogInAuth />} />
        </Route>
        <Route element={<PrivateRoute authData={authData} />}>
          <Route path="select-room" element={<SelectRoom />} />
          <Route path="my_page/*" element={<MyPage />} />
          <Route element={<CheckRoomId />}>
            <Route path="room/:roomId" element={<ImageRoom />} />
          </Route>
          <Route path="people_management/*" element={<PeopleManagement />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
