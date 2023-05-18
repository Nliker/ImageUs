import React from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { Container } from './styles';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@styles/Button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <IconContext.Provider
          value={{
            size: '100px',
            style: { display: 'inline-block' },
          }}
        >
          <BsExclamationTriangle />
        </IconContext.Provider>
      </div>
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
    </Container>
  );
}

export default NotFound;
