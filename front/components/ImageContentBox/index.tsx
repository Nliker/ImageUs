import { CImageData } from '@typing/client';
import React, { memo } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ContentBox, EditBtn, ImageCard, ImageInfo, InfoContainer } from './styles';

interface Props {
  data: CImageData;
  index: number;
  thisArr: CImageData[];
  observerRef?: React.MutableRefObject<null>;
}

const ImageContentBox = ({ data, index, thisArr, observerRef }: Props) => {
  return (
    <ContentBox key={data.id} ref={thisArr.length - 1 === index ? observerRef : undefined}>
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
        <EditBtn>
          <BsThreeDotsVertical />
        </EditBtn>
      </InfoContainer>
    </ContentBox>
  );
};

export default memo(ImageContentBox);
