import React, { useEffect } from 'react';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';
import useSWR from 'swr';
import { logInCheckFetcher } from '@utils/logInFetcher';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const MainPage = loadable(() => import('@pages/MainPage'));
const MyPage = loadable(() => import('@pages/MyPage'));
const PeopleManagement = loadable(() => import('@pages/PeopleManagement'));
const ImageRoom = loadable(() => import('@pages/ImageRoom'));
const SocialLogInAuth = loadable(() => import('@pages/SocialLogInAuth'));

const App = () => {
  // 한 번만 요청하도록 옵션 추가
  const { data: userInfo, isValidating } = useSWR(
    '/user/my',
    logInCheckFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  console.log('app', userInfo?.logInState, isValidating);

  return isValidating ? (
    <div>로딩중...</div>
  ) : (
    <Routes>
      <Route path="/main_page" element={<MainPage />} />
      {userInfo?.logInState ? (
        <>
          {/* 이하 비회원 접근 불가 페이지 */}
          {/* 웹팩 프록시를 사용함으로 image가 들어간 네이밍을 path로 넣으면 안된다! */}
          <Route path="/booth/:roomId" element={<ImageRoom />} />
          <Route path="/my_page/*" element={<MyPage />} />
          <Route path="/people_management/*" element={<PeopleManagement />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}
      <Route path="/callback/oauth-login" element={<SocialLogInAuth />} />
      {/* 추후에 404페이지 작성용 Route */}
      <Route path="*" element={<Navigate to="/main_page" />} />
    </Routes>
  );
};

export default App;
