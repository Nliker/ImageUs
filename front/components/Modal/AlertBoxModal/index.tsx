import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteRoomImgFetcher } from '@utils/roomDataFetcher';
import { leaveRoomFetcher } from '@utils/userDataFetcher';
import { Button } from '@styles/Button';
import { Wrapper } from './styles';
import { deleteUserImage } from '@utils/imageFetcher';

const AlertBox = () => {
  const userId = sessionStorage.getItem('user_id');
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const { data: modalStateData } = useSWR('modalState');
  const alertBoxEl = useRef<HTMLDivElement>(null);
  const currentModalState = modalStateData?.currentModalState;
  const propsData = modalStateData?.data;

  const { trigger: deleteRoomImgTrigger } = useSWRMutation(
    `/room/${roomId}/image`,
    deleteRoomImgFetcher,
  );
  const { trigger: deleteUserImgTrigger } = useSWRMutation(
    '/image',
    deleteUserImage,
  );
  const { trigger: leaveRoomTrigger } = useSWRMutation(
    `/user/${userId}/room`,
    leaveRoomFetcher,
  );

  useEffect(() => {
    window.addEventListener('click', handleCloseAlert);
    return () => {
      window.removeEventListener('click', handleCloseAlert);
    };
  }, []);

  const handleCloseAlert = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      currentModalState === 'alert' &&
      !alertBoxEl.current?.contains(e.target)
    ) {
      mutate('modalState', { currentModalState: '' });
    }
  };

  const executeFetch = () => {
    if (propsData.mutateKey === `/room/${roomId}/image`) {
      deleteRoomImgTrigger(propsData.imageId).then((dataId) => {
        mutate('roomImageDelete', dataId);
      });
    } else if (propsData.mutateKey === `/user/${userId}/room`) {
      leaveRoomTrigger(roomId).then(() => {
        navigate('/');
      });
    } else {
      deleteUserImgTrigger(propsData.imageId).then((dataId) => {
        mutate('userImageDelete', dataId);
      });
    }
  };

  return (
    <Wrapper ref={alertBoxEl}>
      <p>{propsData?.content}</p>
      <div className="btn_group">
        <Button
          type="button"
          onClick={() => {
            executeFetch();
            mutate('modalState', { currentModalState: '' });
          }}
        >
          확인
        </Button>
        <Button
          type="button"
          onClick={() => {
            mutate('modalState', { currentModalState: '' });
          }}
        >
          취소
        </Button>
      </div>
    </Wrapper>
  );
};

export default AlertBox;
