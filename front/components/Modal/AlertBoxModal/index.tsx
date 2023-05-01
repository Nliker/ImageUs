import React, { useRef } from 'react';
import { Button } from '@styles/Button';
import { Wrapper } from './styles';
import useModal from '@hooks/useModal';
import { IAertData } from '@typing/client';

const AlertBox = ({ alertData }: { alertData: IAertData }) => {
  const userId = sessionStorage.getItem('user_id');
  if (!userId) return null;

  const alertBoxEl = useRef<HTMLDivElement>(null);
  const { clearModalCache } = useModal();
  const { executeWork } = alertData;

  return (
    <Wrapper ref={alertBoxEl}>
      <p>{alertData?.text}</p>
      <div className="btn_group">
        <Button
          type="button"
          onClick={() => {
            executeWork();
            clearModalCache();
          }}
        >
          확인
        </Button>
        <Button type="button" onClick={() => clearModalCache()}>
          취소
        </Button>
      </div>
    </Wrapper>
  );
};

export default AlertBox;
