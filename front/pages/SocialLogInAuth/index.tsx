import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router';

import useSocialAuth from '@hooks/useSocialAuth';
import { ILoginData } from '@typing/client';
import { KeyedMutator } from 'swr';

interface Props {
  refreshAuthData: KeyedMutator<ILoginData>;
}

const SocialLogInAuth = ({ refreshAuthData }: Props) => {
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
    try {
      if (loading) return;

      if (isAuthenticated) {
        alert('인증되었습니다.');
        refreshAuthData().then(() => {
          navigate('/select-room', { replace: true });
        });
      }
    } catch (e) {
      const error = new Error(
        '로그인 요청을 실패하였습니다.. 다시 시도해주세요.',
      );
      error.name = 'AuthError';
      throw error;
    }
  }, [isAuthenticated]);

  if (error) {
    error.name = 'AuthError';
    throw error;
  }

  return <div>로그인 요청 처리중..</div>;
};

export default SocialLogInAuth;
