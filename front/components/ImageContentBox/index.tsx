import { CImageData } from '@typing/client';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  AertContainer,
  ContentBox,
  EditBtn,
  EditImageMenu,
  HoverBox,
  ImageCard,
  ImageInfo,
  InfoContainer,
} from './styles';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteImageFetcher } from '@utils/roomDataFetcher';
import { useParams } from 'react-router';
import { Button } from '@styles/Button';

interface Props {
  data: CImageData;
  index: number;
  thisArr: CImageData[];
  observerRef?: React.MutableRefObject<null>;
  sectionName?: string;
}

const ImageContentBox = ({
  data,
  index,
  thisArr,
  observerRef,
  sectionName,
}: Props) => {
  const { data: showModalState, mutate: mutateModalState } =
    useSWR('showModalState');
  // const { data: deleteImageTriggerVar } = useSWR('deleteImage');
  const { mutate: mutateDeleteImageInfo } = useSWR('deleteImageInfo');
  const { mutate: mutateDetailImageInfo } = useSWR('detailImageInfo');
  const { roomId } = useParams<{ roomId: string }>();

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
  const imageDeleteEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomImageList || roomImageDeleting || deleteRoomImageId !== data.id)
      return;
    console.log('이미지 아이디: ', deleteRoomImageId);
    const filteredList = roomImageList.filter(
      (image: CImageData) => image.id !== data.id,
    );
    console.log(filteredList);
    fetchRoomImage([...filteredList], false);
  }, [deleteRoomImageId]);

  useEffect(() => {
    if (!userImageList || userImageDeleting || deleteUserImageId !== data.id)
      return;
    console.log('이미지 아이디: ', deleteUserImageId);
    const filteredList = userImageList.filter(
      (image: CImageData) => image.id !== data.id,
    );
    fetchUserImage([...filteredList], false);
  }, [deleteUserImageId]);

  const onClickShowAlertBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutateModalState({ ...showModalState, alert: true });
    mutateDeleteImageInfo({ id: data.id });
  };

  const onClickPictureInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutateModalState({ ...showModalState, detailPicture: true });
    mutateDetailImageInfo({ index, data });
  };

  // console.log('말단', thisArr, index);

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
              {data.user_id + '' === sessionStorage.getItem('USER_ID') && (
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
