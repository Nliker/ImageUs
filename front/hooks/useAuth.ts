import { logInCheckFetcher, logInRequestFetcher } from '@utils/logInFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

function useAuth() {
  const {
    data: logInData,
    mutate: updateLogInData,
    error,
    isValidating,
  } = useSWR('/user/my', logInCheckFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData: { isAuthenticated: false, userInfo: null },
  });

  const { trigger: logInRequestTrigger } = useSWRMutation(
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
    await logInRequestTrigger({ email, password });
    await updateLogInData();
  };

  return {
    isAuthenticated: logInData.isAuthenticated,
    userInfo: logInData.userInfo,
    loading: (!logInData && !error) || isValidating,
    logInRequest,
  };
}

export default useAuth;
