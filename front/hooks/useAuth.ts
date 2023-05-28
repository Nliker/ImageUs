import { useState } from 'react';
import { getErrorMessage } from '@utils/getErrorMessage';
import { logInCheckFetcher, logInRequestFetcher } from '@utils/logInFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { DUserInfo } from '@typing/db';

interface ILoginData {
  isAuthenticated: string;
  userInfo?: DUserInfo;
}

function useAuth() {
  const {
    data: logInData,
    mutate: updateLogInData,
    error,
    isValidating,
  } = useSWR<ILoginData>('/user/my', logInCheckFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
    fallbackData: { isAuthenticated: 'init' },
  });

  const { trigger: logInTrigger } = useSWRMutation(
    '/user/login',
    logInRequestFetcher,
  );

  const logInRequest = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await logInTrigger({ email, password });
      await updateLogInData();
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  const logOut = async () => {
    try {
      sessionStorage.clear();
      await updateLogInData();
    } catch (error) {
      throw new Error('예기치 못한 오류가 발생하였습니다..새로고침해주세요');
    }
  };

  return {
    isAuthenticated: logInData?.isAuthenticated ?? 'unauthorized',
    userInfo: logInData?.userInfo,
    loading: (!logInData && !error) || isValidating,
    error,
    logInRequest,
    logOut,
    refreshAuthData: updateLogInData,
  };
}

export default useAuth;
