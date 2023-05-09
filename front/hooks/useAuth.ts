import { getErrorMessage } from '@utils/getErrorMessage';
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

  return {
    isAuthenticated: logInData.isAuthenticated,
    userInfo: logInData.userInfo,
    loading: (!logInData && !error) || isValidating,
    logInRequest,
  };
}

export default useAuth;
