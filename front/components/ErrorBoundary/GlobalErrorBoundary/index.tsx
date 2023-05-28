import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  NetworkError,
  NotFoundPage,
  NotFoundRoom,
  UnknownError,
} from '@components/ErrorComponent';
import { Navigate } from 'react-router';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  errorHandled: boolean;
  shouldHandleError: boolean;
  shouldRethrow: boolean;
  error?: Error;
}

/*

    *에러 코드 네임

    로그인 인증 실패: AuthError
    
    정보 요청 api 실패: InfoRequestError

    없는 방에 접속: NotFoundRoomError

    없는 페이지 접속: NotFoundPageError

*/

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    errorHandled: false,
    shouldHandleError: false,
    shouldRethrow: false,
    error: undefined,
  };

  public static getDerivedStateFromError(error: Error) {
    console.log('getDerived!');
    return {
      errorHandled: false,
      shouldHandleError: true,
      shouldRethrow: false,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {}

  public render() {
    console.log('글로벌 렌더', this.state);
    if (!this.state.shouldHandleError) {
      console.log('정상 렌더');
      return this.props.children;
    }

    if (this.state.error?.name === 'AuthError') {
      console.log('auth 에러발생!', this.state);
      // alert(this.state.error.message);
      sessionStorage.clear();
      return <Navigate to={'/login'} replace={true} />;
    }

    if (this.state.error?.name === 'NotFoundRoomError') {
      return <NotFoundRoom />;
    }

    if (this.state.error?.name === 'InfoRequestError') {
      return <NetworkError />;
    }

    if (this.state.error?.name === 'NotFoundPageError') {
      return <NotFoundPage />;
    }

    return <UnknownError />;
  }
}

export { GlobalErrorBoundary };
