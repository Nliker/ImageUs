import React from 'react';
import useModal from '@hooks/useModal';
import { Button } from '@styles/Button';
import { IAertData } from '@typing/client';

import { Wrapper } from './styles';
import ModalLayout from '../ModalLayout';

const AlertBox = ({ alertData }: { alertData: IAertData }) => {
  const userId = sessionStorage.getItem('user_id');
  if (!userId) return null;

  const size = { width: 300, height: 200 };
  const { clearModalCache } = useModal();
  const { executeWork } = alertData;

  return (
    <ModalLayout currentModal="alert" size={size}>
      <Wrapper>
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
    </ModalLayout>
  );
};

export default AlertBox;
