import React, { memo, useState } from 'react';

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
import useUserImageData from '@hooks/useUserImgData';

interface Props {
  data: CImageData;
  index: number;
  thisArr: CImageData[];
  observerRef?: React.MutableRefObject<null>;
  sectionName?: string;
}

const ImageContent = ({ data, index, thisArr, observerRef }: Props) => {
  const userId = sessionStorage.getItem('user_id');

  const { showAlertModal, showDetailPictureModal } = useModal();
  const { deleteStoreImage } = useUserImageData(userId);

  const [isHover, setIsHover] = useState(false);

  const onClickShowAlertBox = () => {
    const executeWork = async () => await deleteStoreImage(data.id);

    showAlertModal({
      text: '이미지를 삭제하시겠습니까?',
      executeWork,
    });
  };

  const onClickOpenImage = () => {
    showDetailPictureModal({ index, data });
  };

  const onTouchContent = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if ((e.target as Element).closest('.detail_btn')) {
      onClickOpenImage();
    } else if ((e.target as Element).closest('.delete_btn')) {
      onClickShowAlertBox();
    }

    setIsHover((prev) => !prev);
  };

  const onClickContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if ((e.target as Element).closest('.detail_btn')) {
      onClickOpenImage();
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
              <div>{}</div>
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
