import React, { memo, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useLocation, useParams } from 'react-router';

import { CImageData } from '@typing/client';
import { Button } from '@styles/Button';
import {
  ContentBox,
  HoverBox,
  ImageCard,
  ImageInfo,
  InfoContainer,
} from './styles';
import { DeviceCheckContext } from '@pages/ImageRoom';
import useModal from '@hooks/useModal';
import useRoomData from '@hooks/useRoomData';

interface Props {
  data: CImageData;
  index: number;
  thisArr: CImageData[];
  observerRef?: React.MutableRefObject<null>;
  sectionName?: string;
}

const ImageContent = ({ data, index, thisArr, observerRef }: Props) => {
  const currentPath = useLocation().pathname;
  const { roomId } = useParams<{ roomId: string }>();
  const { mutate } = useSWRConfig();

  const { setModal } = useModal();
  const { setRoomPayload } = useRoomData();

  const { mutate: mutateDetailImageInfo } = useSWR('detailImageInfo');
  const { data: roomImageList, mutate: fetchRoomImage } = useSWR(
    `/image/${roomId}`,
  );
  const { data: deleteRoomImageId, isLoading: roomImageDeleting } = useSWR(
    'roomImageDelete',
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { data: userImageList, mutate: fetchUserImage } = useSWR(
    '/user/imageDataList',
  );
  const { data: deleteUserImageId, isLoading: userImageDeleting } =
    useSWR('userImageDelete');
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!roomImageList || roomImageDeleting || deleteRoomImageId !== data.id)
      return;
    const filteredList = roomImageList.filter(
      (image: CImageData) => image.id !== data.id,
    );
    fetchRoomImage([...filteredList], false);
  }, [deleteRoomImageId]);

  useEffect(() => {
    if (!userImageList || userImageDeleting || deleteUserImageId !== data.id)
      return;
    const filteredList = userImageList.filter(
      (image: CImageData) => image.id !== data.id,
    );
    fetchUserImage([...filteredList], false);
  }, [deleteUserImageId]);

  const onClickShowAlertBox = () => {
    setRoomPayload({ roomId, imageId: data.id });
    setModal({
      currentModal: 'alert',
      alertData: {
        type: 'deleteRoomImage',
        text: '이미지를 삭제하시겠습니까?',
      },
    });
  };

  const onClickPictureInfo = () => {
    setModal({ currentModal: 'detailPicture' });
    mutateDetailImageInfo({ index, data });
  };

  const onTouchContent = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if ((e.target as Element).closest('.detail_btn')) {
      onClickPictureInfo();
    } else if ((e.target as Element).closest('.delete_btn')) {
      onClickShowAlertBox();
    }

    setIsHover((prev) => !prev);
  };

  const onClickContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if ((e.target as Element).closest('.detail_btn')) {
      onClickPictureInfo();
    } else if ((e.target as Element).closest('.delete_btn')) {
      onClickShowAlertBox();
    }
  };

  return (
    <DeviceCheckContext.Consumer>
      {(isMobile) => (
        <ContentBox
          key={data.id}
          ref={thisArr.length - 1 === index ? observerRef : undefined}
          onMouseEnter={isMobile ? undefined : () => setIsHover(true)}
          onMouseLeave={isMobile ? undefined : () => setIsHover(false)}
          onClick={isMobile ? undefined : onClickContent}
          onTouchEnd={isMobile ? onTouchContent : undefined}
        >
          <ImageCard>
            <img src={data.link} />
          </ImageCard>
          <InfoContainer>
            <ImageInfo>
              <div>
                <span>작성자: {data.user_name}</span>
              </div>
              <div>
                <span>작성일: {data.created_at}</span>
              </div>
            </ImageInfo>
          </InfoContainer>
          {isHover && (
            <HoverBox>
              <div className="btn_group">
                <Button type="button" className="detail_btn">
                  {`자세히 
보기`}
                </Button>
                {data.user_id + '' === sessionStorage.getItem('user_id') && (
                  <Button type="button" className="error delete_btn">
                    {`게시물 
삭제하기`}
                  </Button>
                )}
              </div>
            </HoverBox>
          )}
        </ContentBox>
      )}
    </DeviceCheckContext.Consumer>
  );
};

export default memo(ImageContent);
