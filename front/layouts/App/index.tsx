import React from 'react';
import useSWR from 'swr';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';
import { logInCheckFetcher } from '@utils/logInFetcher';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const MainPage = loadable(() => import('@pages/MainPage'));
const MyPage = loadable(() => import('@pages/MyPage'));
const PeopleManagement = loadable(() => import('@pages/PeopleManagement'));
const ImageRoom = loadable(() => import('@pages/ImageRoom'));
const SocialLogInAuth = loadable(() => import('@pages/SocialLogInAuth'));

const App = () => {
  const { data: userInfo, isValidating } = useSWR(
    '/user/my',
    logInCheckFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return isValidating ? (
    <div>로딩중...</div>
  ) : (
    <Routes>
      <Route path="main_page" element={<MainPage />} />
      {userInfo?.logInState ? (
        <>
          <Route path="booth/:roomId" element={<ImageRoom />} />
          <Route path="my_page/*" element={<MyPage />} />
          <Route path="people_management/*" element={<PeopleManagement />} />
        </>
      ) : (
        <>
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </>
      )}
      <Route path="callback/oauth-login" element={<SocialLogInAuth />} />
      {/* 추후에 404페이지 작성용 Route */}
      <Route path="*" element={<Navigate to="main_page" />} />
    </Routes>
  );
};

export default App;
