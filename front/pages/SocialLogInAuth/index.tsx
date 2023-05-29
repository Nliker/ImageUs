import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router';

import useSocialAuth from '@hooks/useSocialAuth';

const SocialLogInAuth = () => {
  const { coperation, code } = queryString.parse(window.location.search);

  if (!coperation || !code) {
    const error = new Error(
      '잘못된 경로로 접근하셨습니다.. 다시 로그인하세요.',
    );
    error.name = 'AuthError';
    throw error;
  }

  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSocialAuth({
    coperation,
    code,
  });

  useEffect(() => {
    if (loading) return;

    if (isAuthenticated) {
      alert('인증되었습니다.');
      navigate('/select-room', { replace: true });
    } else {
      error.name = 'AuthError';
      throw error;
    }
  }, [isAuthenticated]);

  return <div>로그인 요청 처리중..</div>;
};

export default SocialLogInAuth;
