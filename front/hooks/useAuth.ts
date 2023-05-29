import { useState } from 'react';
import { getErrorMessage } from '@utils/getErrorMessage';
import { logInCheckFetcher, logInRequestFetcher } from '@utils/logInFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { DUserInfo } from '@typing/db';
import { ILoginData } from '@typing/client';

function useAuth() {
  const initialData = { isAuthenticated: 'init', userInfo: null };

  const {
    data: loginData,
    mutate: updateLogInData,
    error,
    isValidating,
  } = useSWR<ILoginData>('/user/my', logInCheckFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
    fallbackData: initialData,
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
    isAuthenticated: loginData?.isAuthenticated ?? 'unauthorized',
    userInfo: loginData?.userInfo,
    loading: (!loginData && !error) || isValidating,
    error,
    logInRequest,
    logOut,
    refreshAuthData: updateLogInData,
  };
}

export default useAuth;
