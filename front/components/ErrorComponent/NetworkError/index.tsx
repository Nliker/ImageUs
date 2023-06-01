import React from 'react';
import NotFoundLayout from '../layout';
import { Button } from '@styles/Button';

function NetworkError() {
  return (
    <NotFoundLayout>
      <div>
        <h1>요청을 실패하였습니다..</h1>
        <div>
          <p>아래 버튼을 눌러 다시시도 해주세요.</p>
        </div>
      </div>
      <div className="btn_group">
        <Button onClick={() => {}}>다시시도 하기</Button>
      </div>
    </NotFoundLayout>
  );
}

export { NetworkError };
