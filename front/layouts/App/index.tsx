import React from 'react';
import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';
import useSWR from 'swr';
import logInFetcher from '@utils/logInFetcher';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const MainPage = loadable(() => import('@pages/MainPage'));
const MyPage = loadable(() => import('@pages/MyPage'));
const FriendList = loadable(() => import('@pages/FriendsList'));

const App = () => {
  const { data: isLogIn } = useSWR('login', logInFetcher);
  console.log('app', isLogIn);
  return (
    <Routes>
      <Route
        path="/"
        element={ isLogIn ? <Navigate to="/main_page" replace /> : <Navigate to="/login" replace />}
      />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* 이하 비회원 접근 불가 페이지 */}
      {/* <Route path="/*" element={<LogInCheck />} /> */}
      {isLogIn && (
        <>
          <Route path="/main_page" element={<MainPage />} />
          <Route path="/my_page/*" element={<MyPage />} />
          <Route path="/friend_list" element={<FriendList />} />
        </>
      )}
      {/* 추후에 404페이지 작성용 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
