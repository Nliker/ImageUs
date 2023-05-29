import {
  NetworkError,
  NotFoundPage,
  NotFoundRoom,
  UnknownError,
} from '@components/ErrorComponent';
import React, { useState, useEffect } from 'react';
import { Navigate, isRouteErrorResponse, useRouteError } from 'react-router';

/*

    *에러 코드 네임

    로그인 인증 실패: AuthError
    
    정보 요청 api 실패: InfoRequestError

    없는 방에 접속: NotFoundRoomError

    없는 페이지 접속: NotFoundPageError

*/

export default function ErrorBoundary() {
  const error = useRouteError();
  const [errorState, setErrorState] = useState(false);

  useEffect(() => {
    setErrorState(true);
  }, []);

  if (!errorState) return null;

  console.log('에러 확인', error);

  if (error instanceof Error) {
    if (error?.name === 'AuthError') {
      console.log('auth 에러발생!');
      sessionStorage.clear();
      alert(error.message);
      window.location.replace('/login');
    }

    if (error?.name === 'NotFoundRoomError') {
      return <NotFoundRoom />;
    }

    if (error?.name === 'InfoRequestError') {
      return <NetworkError />;
    }

    if (error?.name === 'NotFoundPageError') {
      return <NotFoundPage />;
    }
  }

  return <UnknownError />;
}
