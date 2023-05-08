import { socialLoginFetcher } from '@utils/logInFetcher';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

interface IProps {
  coperation: string | (string | null)[] | null;
  code: string | (string | null)[] | null;
}

interface ISocialParam {
  coperation: string;
  code: string;
}

function useSocialAuth(props: IProps) {
  const [paramData, setParamData] = useState<ISocialParam>({
    coperation: '',
    code: '',
  });

  const {
    data: isAuthenticated,
    isValidating,
    error,
  } = useSWR(
    ['/oauth-login/callback', paramData.coperation, paramData.code],
    socialLoginFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  useEffect(() => {
    if (props?.code && props?.coperation) {
      const code = Array.isArray(props.code) ? props.code[0] : props.code;
      const coperation = Array.isArray(props.coperation)
        ? props.coperation[0]
        : props.coperation;
      setParamData((prev) => ({
        ...prev,
        copertaion: coperation as string,
        code: code as string,
      }));
    } else {
      throw new Error('Invalid Param');
    }
  }, [props]);

  return {
    isAuthenticated,
    loading: (!isAuthenticated && !error) || isValidating,
  };
}

export default useSocialAuth;