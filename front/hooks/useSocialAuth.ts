import useSWR from 'swr';
import { socialLoginFetcher } from '@utils/logInFetcher';

interface IProps {
  coperation: string | (string | null)[];
  code: string | (string | null)[];
}

function useSocialAuth(props: IProps) {
  const {
    data: isAuthenticated,
    isValidating,
    error,
  } = useSWR(
    ['/oauth-login/callback', props.coperation, props.code],
    socialLoginFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    isAuthenticated,
    loading: (!isAuthenticated && !error) || isValidating,
    error,
  };
}

export default useSocialAuth;
