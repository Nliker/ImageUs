import axios from 'axios';
import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router';
import useSWR, { useSWRConfig } from 'swr';
import { socialLoginFetcher } from '@utils/logInFetcher';

const SocialLogInAuth = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { coperation, code } = queryString.parse(window.location.search);

  const { data: socialLoginSuccess } = useSWR(
    ['/oauth-login/callback', coperation, code],
    socialLoginFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  useEffect(() => {
    if (socialLoginSuccess === undefined) return;
    if (socialLoginSuccess === false) {
      alert('로그인에 실패했습니다.');
    }
    mutate('/user/my');
    navigate('/');
  }, [socialLoginSuccess]);

  return <div>로그인 요청 처리중..</div>;
};

export default SocialLogInAuth;
