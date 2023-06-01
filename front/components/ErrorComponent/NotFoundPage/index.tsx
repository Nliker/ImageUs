import React from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@styles/Button';
import NotFoundLayout from '../layout';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <NotFoundLayout>
      <div>
        <h1>페이지를 찾을 수 없습니다!</h1>
        <div>
          <p>죄송합니다, 요청해주신 페이지를 찾지 못하였습니다...</p>
        </div>
      </div>
      <div className="btn_group">
        <Button onClick={() => navigate('/', { replace: true })}>
          홈으로 가기
        </Button>
        <Button onClick={() => navigate(-1)}>이전 페이지</Button>
      </div>
    </NotFoundLayout>
  );
}

export { NotFoundPage };
