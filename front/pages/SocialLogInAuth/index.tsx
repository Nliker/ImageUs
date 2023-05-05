import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router';

import useSocialAuth from '@hooks/useSocialAuth';

const SocialLogInAuth = () => {
  const { coperation, code } = queryString.parse(window.location.search);

  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSocialAuth({ coperation, code });

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      alert('인증되었습니다.');
      navigate('/select-room', { replace: true });
    } else {
      alert('인증에 실패하였습니다.. 다시 로그인 해주세요..');
      navigate('/login');
    }
  }, [isAuthenticated]);

  return <div>로그인 요청 처리중..</div>;
};

export default SocialLogInAuth;
