import { Button } from '@styles/Button';
import { CImageData } from '@typing/client';
import { deleteImageFetcher } from '@utils/roomDataFetcher';
import { deleteUserImage } from '@utils/userDataFetcher';
import React, { useCallback, useEffect } from 'react';
import { useRef } from 'react';
import { useLocation, useParams } from 'react-router';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { Wrapper } from './styles';

const AlertBox = () => {
  const currentPath = useLocation().pathname;
  const { roomId } = useParams<{ roomId: string }>();
  const { data: showModalState, mutate: changeAlertState } =
    useSWR('showModalState');
  const { data: imageDataInfo } = useSWR('deleteImageInfo');
  const alertBoxEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', handleCloseAlert);
    return () => {
      window.removeEventListener('click', handleCloseAlert);
    };
  }, []);

  const handleCloseAlert = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      showModalState.alert &&
      !alertBoxEl.current?.contains(e.target)
    ) {
      changeAlertState({ ...showModalState, alert: false });
    }
  };

  const deleteImage = async () => {
    console.log('삭제 요청');

    if (currentPath === '/my_page') {
      mutate('userImageDelete', deleteUserImage(imageDataInfo.id));
    } else {
      mutate(
        'roomImageDelete',
        deleteImageFetcher([`/room/${roomId}/image`, imageDataInfo.id]),
      );
    }
    changeAlertState({ ...showModalState, alert: false });
  };

  return (
    <Wrapper ref={alertBoxEl}>
      <p>정말 삭제하시겠습니까?</p>
      <div className="btn_group">
        <Button type="button" onClick={deleteImage}>
          확인
        </Button>
        <Button
          type="button"
          onClick={() => {
            changeAlertState({ ...showModalState, alert: false });
          }}
        >
          취소
        </Button>
      </div>
    </Wrapper>
  );
};

export default AlertBox;
