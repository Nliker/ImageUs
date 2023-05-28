import React from 'react';
import NotFoundLayout from '../layout';
import { Button } from '@styles/Button';

function UnknownError() {
  return (
    <NotFoundLayout>
      <div>
        <h1>예기치 못한 오류가 발생하였습니다..</h1>
        <div>
          <p>아래 버튼을 눌러 새로고침하거나, 홈으로 이동하세요.</p>
        </div>
      </div>
      <div className="btn_group">
        <Button
          onClick={() => {
            window.location.reload();
          }}
        >
          새로고침하기
        </Button>
        <Button
          onClick={() => {
            window.location.href = '/';
          }}
        >
          홈으로 가기
        </Button>
      </div>
    </NotFoundLayout>
  );
}

export { UnknownError };
