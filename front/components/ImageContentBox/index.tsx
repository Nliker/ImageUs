import { CImageData } from '@typing/client';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  ContentBox,
  EditBtn,
  EditImageMenu,
  ImageCard,
  ImageInfo,
  InfoContainer,
} from './styles';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { deleteImageFetcher } from '@utils/roomDataFetcher';
import { useParams } from 'react-router';

interface Props {
  data: CImageData;
  index: number;
  thisArr: CImageData[];
  observerRef?: React.MutableRefObject<null>;
  sectionName: string;
}

/*

  swrMutation은 전역 상태관리로 사용할 수 없다.

*/

const ImageContentBox = ({
  data,
  index,
  thisArr,
  observerRef,
  sectionName,
}: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: imageList, mutate: fetchData } = useSWR(
    `/image/${roomId}/${sectionName}`,
  );
  const { trigger: deleteTrigger } = useSWRMutation(
    `/room/${roomId}/image`,
    deleteImageFetcher,
  );

  const [showEditBox, setShowEditBox] = useState(false);
  const imageDeleteEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', handleCloseEditBox);
    return () => {
      window.removeEventListener('click', handleCloseEditBox);
    };
  });

  const handleCloseEditBox = useCallback(
    (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement ||
        (e.target instanceof SVGElement &&
          showEditBox &&
          !imageDeleteEl.current?.contains(e.target))
      ) {
        setShowEditBox(false);
      }
    },
    [showEditBox],
  );

  const onClickEditBtn = useCallback(() => {
    setShowEditBox(true);
  }, [showEditBox]);

  const deleteImage = useCallback(async () => {
    deleteTrigger(data.id).then(() => {
      const filteredList = imageList.filter(
        (image: CImageData) => image.id !== data.id,
      );
      fetchData([...filteredList], false);
    });
  }, [data]);

  return (
    <ContentBox
      key={data.id}
      ref={thisArr.length - 1 === index ? observerRef : undefined}
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
        {data.user_id + '' === sessionStorage.getItem('USER_ID') && (
          <EditBtn onClick={onClickEditBtn}>
            <BsThreeDotsVertical />
          </EditBtn>
        )}
        {showEditBox && (
          <EditImageMenu ref={imageDeleteEl}>
            <p className="delete_img" onClick={deleteImage}>
              이미지 삭제하기
            </p>
          </EditImageMenu>
        )}
      </InfoContainer>
    </ContentBox>
  );
};

export default memo(ImageContentBox);
