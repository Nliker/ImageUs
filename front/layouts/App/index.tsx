import React, { useEffect, useMemo } from 'react';
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
import useRoomList from '@hooks/useRoomList';
import { DRoomData } from '@typing/db';

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

  useEffect(() => {
    refreshAuthData();
  }, []);

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
          <Route
            path="room/:roomId"
            loader={async ({ params }) => {
              console.log('loader');
              const userId = sessionStorage.getItem('user_id');
              const { roomId } = params;
              if (!userId)
                throw new Error('유저의 정보가 없습니다.. 다시로그인하세요');

              const { roomList } = useRoomList(userId);
              const isValidRoomId = roomList?.some((roomInfo: DRoomData) => {
                return '' + roomInfo.id === roomId;
              });

              console.log('방 존재', roomList, isValidRoomId);
              if (!isValidRoomId)
                throw new Error('존재하지 않는 방입니다..다른 방에 접속하세요');
            }}
            errorElement={<div>not found</div>}
            element={<ImageRoom />}
          />
          <Route path="people_management/*" element={<PeopleManagement />} />
        </Route>
        <Route path="*" element={<div>404 페이지</div>} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
