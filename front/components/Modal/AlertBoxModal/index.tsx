import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteRoomImgFetcher } from '@utils/roomDataFetcher';
import { leaveRoomFetcher } from '@utils/userDataFetcher';
import { Button } from '@styles/Button';
import { Wrapper } from './styles';
import { deleteUserImage } from '@utils/imageFetcher';
import useModal from '@hooks/useModal';
import useUserData from '@hooks/useUserData';
import useRoomData from '@hooks/useRoomData';
import useRoomlist from '@hooks/useRoomlist';

const AlertBox = () => {
  const userId = sessionStorage.getItem('user_id');
  const alertBoxEl = useRef<HTMLDivElement>(null);

  const { currentModal, alertData, clearModalCache } = useModal();
  const { refresh: refreshRoomlist } = useRoomlist();
  const { leaveRoom, deleteStoreImage } = useUserData();
  const { deleteRoomImage } = useRoomData();
  const navigate = useNavigate();

  const executeFetch = () => {
    if (alertData.type === 'deleteRoomImage') {
      deleteRoomImage();
    } else if (alertData.type === 'leaveRoom') {
      leaveRoom().then(() => {
        refreshRoomlist();
        navigate('/room-select');
      });
    } else if (alertData.type === 'deleteStoreImage') {
      deleteStoreImage();
    }
  };

  return (
    <Wrapper ref={alertBoxEl}>
      <p>{alertData.text}</p>
      <div className="btn_group">
        <Button
          type="button"
          onClick={() => {
            executeFetch();
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
