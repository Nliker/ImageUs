import React from 'react';

import { Button } from '@styles/Button';
import NotFoundLayout from '../layout';

function NotFoundRoom() {
  return (
    <NotFoundLayout>
      <div>
        <h1>방을 찾을 수 없습니다!</h1>
        <div>
          <p>죄송합니다, 방에 접속하지 못하였습니다...</p>
        </div>
      </div>
      <div className="btn_group">
        <Button
          onClick={() => {
            window.location.href = '/select-room';
          }}
        >
          방 목록으로 이동하기
        </Button>
      </div>
    </NotFoundLayout>
  );
}

export { NotFoundRoom };
