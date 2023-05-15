import React, { memo, useState } from 'react';
import { useParams } from 'react-router';

import { CImageData } from '@typing/client';
import { Button } from '@styles/Button';
import useModal from '@hooks/useModal';
import useRoomImgData from '@hooks/useRoomImgData';
import { getErrorMessage } from '@utils/getErrorMessage';
import { CSSProperties } from 'react';
import {
  ContentBox,
  Cover,
  HoverBox,
  ImageCard,
  ImageInfo,
  InfoContainer,
} from './styles';

interface Props {
  data: CImageData;
  index: number;
  isMobile: boolean;
}

const blindCSS: CSSProperties = {
  clipPath: 'circle(0%)',
  width: '1px',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
};

const ImageContent = ({ data, index, isMobile }: Props) => {
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId) return null;

  const { showAlertModal, showDetailPictureModal } = useModal();
  const { deleteRoomImage } = useRoomImgData(roomId);

  const [isHovered, setIsHovered] = useState(false);

  const executeWork = async () => {
    try {
      await deleteRoomImage(data.id);
      alert('방에서 사진을 삭제하였습니다!');
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  const onClickShowAlertBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    showAlertModal({
      text: '이미지를 삭제하시겠습니까?',
      executeWork,
    });
  };

  const onClickOpenImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    showDetailPictureModal({ index, data });
  };

  return (
    <ContentBox key={data.id}>
      {isMobile ? (
        <Cover
          onClick={() => {
            setIsHovered((prev) => !prev);
          }}
        >
          <HoverBox style={isHovered ? undefined : blindCSS}>
            <div className="btn_group">
              <Button type="button" onClick={onClickOpenImage}>
                {`자세히 
`}
              </Button>
              {data.user_id + '' === sessionStorage.getItem('user_id') && (
                <Button
                  type="button"
                  className="error"
                  onClick={onClickShowAlertBox}
                >
                  {`게시물 
하기`}
                </Button>
              )}
            </div>
          </HoverBox>
        </Cover>
      ) : (
        <Cover
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          <HoverBox style={isHovered ? undefined : blindCSS}>
            <div className="btn_group">
              <Button type="button" onClick={onClickOpenImage}>
                {`자세히 
`}
              </Button>
              {data.user_id + '' === sessionStorage.getItem('user_id') && (
                <Button
                  type="button"
                  className="error"
                  onClick={onClickShowAlertBox}
                >
                  {`게시물 
하기`}
                </Button>
              )}
            </div>
          </HoverBox>
        </Cover>
      )}
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
      {/* {isHovered && (
        <HoverBox>
          <div className="btn_group">
            <Button type="button" onClick={onClickOpenImage}>
              {`자세히 
`}
            </Button>
            {data.user_id + '' === sessionStorage.getItem('user_id') && (
              <Button
                type="button"
                className="error"
                onClick={onClickShowAlertBox}
              >
                {`게시물 
하기`}
              </Button>
            )}
          </div>
        </HoverBox>
      )} */}
    </ContentBox>
  );
};

export default memo(ImageContent);
