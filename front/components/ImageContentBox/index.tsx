import React, { memo, useEffect, useRef, useState } from 'react';
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

interface Props {
  data: CImageData;
  index: number;
  thisArr: CImageData[];
  observerRef?: React.MutableRefObject<null>;
  sectionName?: string;
}

const ImageContentBox = ({ data, index, thisArr, observerRef }: Props) => {
  const currentPath = useLocation().pathname;
  const { roomId } = useParams<{ roomId: string }>();
  const { mutate } = useSWRConfig();

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

  const onClickShowAlertBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const alertArgKey =
      currentPath === '/my_page' ? '/image' : `/room/${roomId}/image`;

    mutate('modalState', {
      currentModalState: 'alert',
      data: {
        content: '정말 삭제하시겠습니까?',
        mutateKey: alertArgKey,
        imageId: data.id,
      },
    });
  };

  const onClickPictureInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate('modalState', { currentModalState: 'detailPicture' });
    mutateDetailImageInfo({ index, data });
  };

  return (
    <>
      <ContentBox
        key={data.id}
        ref={thisArr.length - 1 === index ? observerRef : undefined}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
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
              <Button type="button" onClick={onClickPictureInfo}>
                자세히 보기
              </Button>
              {data.user_id + '' === sessionStorage.getItem('user_id') && (
                <Button
                  type="button"
                  className="error"
                  onClick={onClickShowAlertBox}
                >
                  게시물 삭제하기
                </Button>
              )}
            </div>
          </HoverBox>
        )}
      </ContentBox>
    </>
  );
};

export default memo(ImageContentBox);
