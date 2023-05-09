import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router';

import useSocialAuth from '@hooks/useSocialAuth';
import { getErrorMessage } from '@utils/getErrorMessage';

const SocialLogInAuth = () => {
  const { coperation, code } = queryString.parse(window.location.search);

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
      const message = getErrorMessage(error);
      alert(message);
      navigate('/login');
    }
  }, [isAuthenticated]);

  return <div>로그인 요청 처리중..</div>;
};

export default SocialLogInAuth;
