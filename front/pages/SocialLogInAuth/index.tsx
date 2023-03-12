import React, { useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import queryString from 'query-string';
import { useNavigate } from 'react-router';

import { logInCheckFetcher, socialLoginFetcher } from '@utils/logInFetcher';

const SocialLogInAuth = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { coperation, code } = queryString.parse(window.location.search);

  const { data: socialLoginRequest } = useSWR(
    ['/oauth-login/callback', coperation, code],
    socialLoginFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  useEffect(() => {
    if (!socialLoginRequest) return;

    if (socialLoginRequest.result === 'success') {
      mutate('/user/my', logInCheckFetcher('/user/my')).then(() => {
        navigate('/', { replace: true });
      });
    } else {
      navigate('/login');
    }
  }, [socialLoginRequest]);

  return <div>로그인 요청 처리중..</div>;
};

export default SocialLogInAuth;
